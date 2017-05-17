SELECT users.id, users.nom, users.prenom, users.tel ,users.mail ,coalesce(commandes.count,0) as commandesCount, coalesce(comments.count,0) as commentsCount 
FROM users
left outer join (SELECT id_user, count(*) from comments group by id_user ) as comments on(comments.id_user = users.id)
left outer join( SELECT id_client,count(*) from commandes group by id_client) as commandes on(commandes.id_client = users.id)

ORDER BY nom desc
LIMIT 10
OFFSET 0
;

