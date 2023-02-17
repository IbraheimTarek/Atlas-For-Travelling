use mydb;
select * 
from trip;

insert into user (id,userName,email,password,wallet,userType)
values  
(120,'admin','admin@googl.com','111',0,3),
(1,'ahemd','ahmed@googl.com','111',0,1),
(2,'omer','omer@googl.com','222',0,1),
(3,'mohamed','mohamed@googl.com','333',0,1),
(4,'ahemdibra','ahmedibra@googl.com','444',0,1),
(5,'ahemdq','ahmedq@googl.com','555',0,1),
(6,'ahemdww','ahmedww@googl.com','666',0,1),
(7,'ahemdee','ahmedee@googl.com','777',0,1),
(8,'ahemdrr','ahmedrr@googl.com','888',0,1),
(9,'ahemdtt','ahmedtt@googl.com','999',0,1),
(11,'ahemdyy','ahmedyy@googl.com','1111',0,0),
(12,'ahemduu','ahmeduu@googl.com','11222',0,0),
(13,'ahemdii','ahmedii@googl.com','11333',0,0),
(14,'ahemdoo','ahmedoo@googl.com','11444',0,0),
(15,'ahemdaa','ahmeaad@googl.com','11555',0,0),
(16,'ahemdss','ahmedss@googl.com','11666',0,0),
(17,'ahemddd','ahmeddd@googl.com','11777',0,0),
(18,'ahemdff','ahmedff@googl.com','11888',0,0),
(19,'ahemdffas','ahmedfffas@googl.com','1199as9',0,0),
(20,'ahemdffads','ahmedfffads@googl.com','11999',0,0);



insert into company (user_id,bio,companyName)
values
(1,"hi all","a"),
(2,"hi all","ab"),
(3,"hi all","abc"),
(4,"hi all","abcd"),
(5,"hi all","abcde"),
(6,"hi all","abcdf"),
(7,"hi all","abcdfg"),
(8,"hi all","abcdfgh"),
(9,"hi all","abcdfghi");
insert into explorer (user_id,bio)
values
(11,"hi all"),
(12,"hi all"),
(13,"hi all"),
(14,"hi all"),
(15,"hi all"),
(16,"hi all"),
(17,"hi all"),
(18,"hi all"),
(19,"hi all"),
(20,"hi all");


insert into explorerPhotos (photoURL,explorer_user_id)
values
("https://images.unsplash.com/photo-1643930430729-3b4d484ddb1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" , 11),
("https://images.unsplash.com/photo-1643930429953-e59915e2af31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGZheW91bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" , 12),
("https://images.unsplash.com/photo-1574763500032-3235170f95ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGZheW91bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" , 13),
("https://images.unsplash.com/photo-1574765095964-144a95a67d94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fGZheW91bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" , 14),
("https://images.unsplash.com/photo-1574765096042-2d2f9b8543f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fGZheW91bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" , 15),
("https://images.unsplash.com/photo-1574765298211-cb0b2a3424c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fGZheW91bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" , 16),
("https://images.unsplash.com/photo-1617847558716-25448af0c46d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fGZheW91bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" , 17),
("https://images.unsplash.com/photo-1597816994053-7da58867571c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fGZheW91bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" , 18),
("https://images.unsplash.com/photo-1643930429954-18b339d4221b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fGZheW91bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" , 19),
("https://images.unsplash.com/photo-1647076470596-d84cd09a3ce6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fGZheW91bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" , 20),
("https://images.unsplash.com/photo-1654237519747-23a6b12e668f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDN8fGZheW91bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" , 11),
("https://images.unsplash.com/photo-1654237565618-dee393f37ad0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fGZheW91bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" , 12),
("https://images.unsplash.com/photo-1643048825776-238eac66b36b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDV8fGZheW91bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" , 13),
("https://images.unsplash.com/photo-1655317091382-c43353da4395?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8ZmF5b3VtfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" , 14),
("https://images.unsplash.com/photo-1647076624671-e37c39ffc55c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTB8fGZheW91bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" , 15),
("https://images.unsplash.com/photo-1639162701137-b0fbdd52c558?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTR8fGZheW91bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" , 16),
("https://images.unsplash.com/photo-1639163121354-1629506bc6c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTV8fGZheW91bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" , 17);


insert into bus (id,agency,capacity) 
values 
(1, 'green', 12),
(2, 'green', 12),
(3, 'green', 12),
(4, 'green', 12),
(5, 'green', 12),
(6, 'green', 12),
(7, 'green', 12),
(8, 'green', 12),
(9, 'green', 12),
(10, 'red',15),
(11, 'red',15),
(12, 'red',15),
(13, 'red',15),
(14, 'red',15),
(15, 'red',15),
(16, 'red',15),
(17, 'red',15),
(18, 'red',15),
(19, 'red',15),
(20, 'red',15);


insert into country (name,language)
values
("Afghanistan", "Dari"),
("Albania", "Albanian"),
("Algeria", "Arabic"),
("Andorra", "Catalan"),
("Angola", "Kongo"),
("Antigua", "English"),
("Argentina", "Spanish"),
("Armenia", "Armenian"),
("Australia", "English"),
("Austria", "Österreich"),
("Azerbaijan", "Azerbaijan"),
("The Bahamas", "English"),
("Bahrain", "Arabic"),
("Bangladesh", "Bengali"),
("Barbados", "English"),
("Belarus", "Belarusian"),
("Belgium", "Dutch"),
("Belize", "English"),
("Benin", "French"),
("Bhutan", "Dzongkha");




insert into creature (name, family ,discription,endangered,kingdom)
values 
("a", "cats", "wild creature", 0, "animal"),
("q", "cats", "wild creature", 0, "animal"),
("w", "cats", "wild creature", 0, "animal"),
("e", "cats", "wild creature", 0, "animal"),
("r", "cats", "wild creature", 0, "animal"),
("t", "cats", "wild creature", 0, "animal"),
("y", "cats", "wild creature", 0, "animal"),
("u", "cats", "wild creature", 0, "animal"),
("i", "cats", "wild creature", 1, "animal"),
("o", "cats", "wild creature", 1, "animal"),
("p", "cats", "wild creature", 1, "animal"),
("gg", "dogs", "wild creature", 1, "plant"),
("bb", "dogs", "wild creature", 1, "plant"),
("z", "dogs", "wild creature", 1, "plant"),
("x", "dogs", "wild creature", 1, "plant"),
("c", "dogs", "wild creature", 1, "plant"),
("cv", "dogs", "wild creature", 1, "plant"),
("vc", "dogs", "wild creature", 1, "plant"),
("v", "dogs", "wild creature", 1, "plant"),
("b", "dogs", "wild creature", 1, "plant");




insert into place(longitude, latitude, name,country_name,placeType)
values
(1, 1, "place1", "Benin",0),
(2, 1, "place2", "Benin",0),
(3, 1, "place3", "Benin",0),
(4, 1, "place4", "Benin",0),
(5, 1, "plac5", "Benin",0),
(6, 1, "place6", "Benin",0),
(7, 1, "place7", "Benin",1),
(8, 1, "plac8", "Benin",1),
(9, 1, "place9", "Benin",1),
(1, 2, "place11", "Belize",1),
(2, 2, "place12", "Belize",1),
(3, 2, "place13", "Belize",1),
(4, 2, "place14", "Belize",1),
(5, 2, "plac51", "Benin",2),
(6, 2, "place16", "Austria",2),
(7, 2, "place17", "Austria",2),
(8, 2, "plac81", "Benin",2),
(9, 2, "place19", "Benin",2);


insert into placePhotos(photoURL, place_longitude, place_latitude)
values
("https://images.unsplash.com/photo-1643930430729-3b4d484ddb1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"			,1, 1),
("https://images.unsplash.com/photo-1643930429953-e59915e2af31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGZheW91bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"  ,2, 1),
("https://images.unsplash.com/photo-1574763500032-3235170f95ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGZheW91bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"  ,3, 1),
("https://images.unsplash.com/photo-1574765095964-144a95a67d94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fGZheW91bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"  ,4, 1),
("https://images.unsplash.com/photo-1574765096042-2d2f9b8543f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fGZheW91bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"  ,5, 1),
("https://images.unsplash.com/photo-1574765298211-cb0b2a3424c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fGZheW91bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"  ,6, 1),
("https://images.unsplash.com/photo-1617847558716-25448af0c46d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fGZheW91bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"  ,7, 1),
("https://images.unsplash.com/photo-1597816994053-7da58867571c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fGZheW91bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"  ,8, 1),
("https://images.unsplash.com/photo-1643930429954-18b339d4221b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fGZheW91bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"  ,9, 2),
("https://images.unsplash.com/photo-1647076470596-d84cd09a3ce6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fGZheW91bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"  ,1, 2),
("https://images.unsplash.com/photo-1654237519747-23a6b12e668f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDN8fGZheW91bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"  ,2, 2),
("https://images.unsplash.com/photo-1654237565618-dee393f37ad0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fGZheW91bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"  ,3, 2),
("https://images.unsplash.com/photo-1643048825776-238eac66b36b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDV8fGZheW91bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"  ,4, 2),
("https://images.unsplash.com/photo-1655317091382-c43353da4395?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8ZmF5b3VtfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",5, 2),
("https://images.unsplash.com/photo-1647076624671-e37c39ffc55c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTB8fGZheW91bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"  ,6, 2),
("https://images.unsplash.com/photo-1639162701137-b0fbdd52c558?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTR8fGZheW91bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"  ,7, 2),
("https://images.unsplash.com/photo-1639163121354-1629506bc6c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTV8fGZheW91bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"  ,8, 2);



insert into city(population,history,religion,place_longitude, place_latitude)
values
(100, "nothing bad", "zandaka", 1, 1),
(100, "nothing bad", "zandaka", 2, 1),
(100, "nothing bad", "zandaka", 3, 1),
(100, "nothing bad", "zandaka", 4, 1),
(100, "nothing bad", "zandaka", 5, 1),
(100, "nothing bad", "zandaka", 6, 1);



insert into naturereserve(reserveType,discription,place_longitude, place_latitude)
values
("abeed", "already abeed", 7, 1),
("abeed", "already abeed", 8, 1),
("abeed", "already abeed", 9, 1),
("abeed", "already abeed", 1, 2),
("abeed", "already abeed", 2, 2),
("abeed", "already abeed", 3, 2),
("abeed", "already abeed", 4, 2);


insert into topography(discription, landType,  place_longitude, place_latitude)
values
("already abeed land", "abeed land", 5, 2),
("already abeed land", "abeed land", 6, 2),
("already abeed land", "abeed land", 7, 2),
("already abeed land", "abeed land", 8, 2),
("already abeed land", "abeed land",  9, 2);


insert into creature_has_place( creature_name,  place_longitude, place_latitude)
values
("a", 1, 1),
("q", 2, 1),
("w", 3, 1),
("e", 4, 1),
("r", 5, 1),
("t", 6, 1),
("y", 7, 1),
("u", 8, 1),
("i", 9, 1),
("o", 1, 2),
("p", 2, 2),
("gg", 3, 2),
("bb", 4, 2),
("z", 5, 2),
("x", 6, 2),
("c", 7, 2),
("cv", 8, 2),
("vc", 9, 2);



insert into trip (id,price,tripType,numberOfDay,description,date,noOfExpolorers,company_user_id,bus_id,place_longitude,place_latitude)
values
(1 , 10, "trip1",5, "fun", "2022-11-12", 0, 1,	   1 , 1, 1),
(2 , 10, "trip1",5, "fun", "2022-11-12", 0, 2,	   2 , 2, 1),
(3 , 10, "trip1",5, "fun", "2022-11-12", 0, 3,	   3 , 3, 1),
(4 , 10, "trip1",5, "fun", "2022-11-12", 0, 4,	   4 , 4, 1),
(5 , 10, "trip1",5, "fun", "2022-11-12", 0, 5,	   5 , 5, 1),
(6 , 10, "trip1",5, "fun", "2022-11-12", 0, 6,	   6 , 6, 1),
(7 , 10, "trip1",5, "fun", "2022-11-12", 0, 7,	   7 , 7, 1),
(8 , 10, "trip1",5, "fun", "2022-11-12", 0, 8,	   8 , 8, 1),
(9 , 10, "trip1",5, "fun", "2022-11-12", 0, 9,	   9 , 9, 1),
(11, 20, "trip2",5, "not fun", "2023-11-12", 0, 1, 11, 1, 2),
(12, 20, "trip2",5, "not fun", "2023-11-12", 0, 2, 12, 2, 2),
(13, 20, "trip2",5, "not fun", "2023-11-12", 0, 3, 13, 3, 2),
(14, 20, "trip2",5, "not fun", "2023-11-12", 0, 4, 14, 4, 2),
(15, 20, "trip2",5, "not fun", "2023-11-12", 0, 5, 15, 5, 2),
(16, 20, "trip2",5, "not fun", "2023-11-12", 0, 6, 16, 6, 2),
(17, 20, "trip2",5, "not fun", "2023-11-12", 0, 7, 17, 7, 2),
(18, 20, "trip2",5, "not fun", "2023-11-12", 0, 8, 18, 8, 2),
(19, 20, "trip2",5, "not fun", "2023-11-12", 0, 9, 19, 9, 2);

-- /// need to drop enroll table and do it again 
