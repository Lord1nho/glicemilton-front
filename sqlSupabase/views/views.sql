CREATE OR REPLACE VIEW public.v_cuidados_usuario AS
SELECT
    c.id,
    c.titulo,
    c.descricao,
    c.icone,
    c.ordem,
    c.ativo,
    COALESCE(uc.concluido, false) AS concluido,
    uc.concluido_em
FROM cuidados_diarios c
         LEFT JOIN usuario_cuidados uc
                   ON uc.cuidado_id = c.id
                       AND uc.id_usuario = (
                           SELECT u.id_usuario
                           FROM usuarios u
                           WHERE u.auth_id = auth.uid()
                       )
                       AND uc.data = CURRENT_DATE
WHERE c.ativo = true
ORDER BY c.ordem;



CREATE VIEW atividade_realizada_detalhada AS
SELECT
    ar.id_realizada,
    ar.id_usuario,
    ar.data_hora,
    af.id_atividade AS atividade_id,
    af.name,
    af.points,
    af.emoji
FROM atividade_realizada ar
         JOIN atividade_fisica af
              ON af.id_atividade = ar.id_atividade;


CREATE VIEW vw_missao_respondida_hoje AS
SELECT
    m.id_missao,
    m.titulo,
    m.descricao,
    m.pontos,
    u.id_usuario,

    -- respondeu hoje?
    EXISTS (
        SELECT 1
        FROM resposta_usuario_missao r
        WHERE r.id_usuario = u.id_usuario
          AND r.id_missao = m.id_missao
          AND r.data_dia = CURRENT_DATE
    ) AS respondida_hoje,

    -- acertou hoje?
    (
        SELECT a.correta
        FROM resposta_usuario_missao r
                 JOIN alternativa_missao a
                      ON a.id_alternativa = r.id_alternativa
        WHERE r.id_usuario = u.id_usuario
          AND r.id_missao = m.id_missao
          AND r.data_dia = CURRENT_DATE
         LIMIT 1
    ) AS acertou_hoje

FROM missao m
CROSS JOIN usuarios u;
