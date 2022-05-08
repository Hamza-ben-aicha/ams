 `select * from resquestions where ProjetId=${id}`
 
 
select * from resquestions where ProjetId = 157 and id_question = (select id from questions where ArticleId =  (select id from articles where ChapitreId = (select id from chapitres where NormeId = (select NormeId from projets where id=157))))
select id_article from questions where id = 

insert into resquestions (ChapitreId) select ChapitreId from articles where id in (select q.ArticleId from (questions q, articles a ,chapitres c, normes n) where q.id= 3)


UPDATE db_ams.resquestions SET ChapitreId= (select ChapitreId from db_ams.articles where id in (select ArticleId from db_ams.questions where id= 1)) where ProjetId=158

UPDATE db_ams.resquestions SET ChapitreId= (select ChapitreId from db_ams.articles where id in (select ArticleId from db_ams.questions where id in (select id_question from db_ams.resquestions where ChapitreId IS NULL ) )) where ProjetId=158


UPDATE db_ams.resquestions SET ChapitreId= (select ChapitreId from db_ams.articles where id in (select ArticleId from db_ams.questions where id= 1)) where ProjetId=158 and  id_question = 1 and ChapitreId IS NULL




update db_ams.resquestions set ChapitreId = (select id from db_ams.chapitres where id = (select ChapitreId from db_ams.articles where id = (select ArticleId from db_ams.questions where id = 2))) where ProjetId = 159