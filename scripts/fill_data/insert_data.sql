
START TRANSACTION;
DELETE FROM reviews;
DELETE FROM payment_methods;
DELETE FROM shipping_methods;
DELETE FROM orders;
DELETE FROM receipts;
DELETE FROM customers;
DELETE FROM categories;
DELETE FROM products;
DELETE FROM admins;


--  Categories
ALTER SEQUENCE categories_id_seq RESTART;

INSERT INTO categories(name, description, image_link, parent_category)
VALUES ('Men', 'Categories for men', 'assets/images/promo/promo_1.jpg', null),
       ('Women', 'Category for women', 'assets/images/promo/promo_4.jpg', null),
       ('Watch', 'Category for watch', 'assets/images/promo/promo_3.jpg', null),
       ('Shoe', 'Category for shoe', 'assets/images/promo/promo_2.jpg', null),
       ('Prepare', 'Number rule simple four play growth. Hot recent seven tell half. Star human assume recognize give idea.', 'gen_images/category/2.png', NULL),
       ('Suddenly', 'Strategy organization leave. Somebody finish real trip.', 'gen_images/category/1.png', NULL),
       ('Lead enter', 'Attack moment peace officer analysis imagine present. Approach admit culture bit cultural see yourself notice.', 'gen_images/category/32.png', 4),
       ('Actually', 'It so near simply new position. Particularly Congress money continue production. Region on wind agency mission my pressure. Same sometimes popular energy remember way.', 'gen_images/category/32.png', 5),
       ('Well', 'Star court well street there never. Glass response trade amount explain will.', 'gen_images/category/38.png', 4),
       ('Arrive', 'Herself decade price popular enough degree. Machine party need civil. Hotel create several person individual city.', 'gen_images/category/23.png', 6),
       ('Light recently', 'Air outside political. Shake where fire I grow. Throughout oil whole herself perhaps.', 'gen_images/category/3.png', 6),
       ('Every second', 'Leave able beat use. Money order home cause teach mean her. Box drug appear so defense movement.', 'gen_images/category/20.png', 8),
       ('Up oil', 'Media opportunity popular political. Fast chance letter ball their run major.', 'gen_images/category/32.png', 5),
       ('Lot', 'So class sell positive.', 'gen_images/category/4.png', 10),
       ('See', 'Leave source pull sell agent international. Bill college response traditional picture teach church culture. City politics identify other. Issue quite indeed surface.', 'gen_images/category/33.png', 9),
       ('Left season', 'Attack power carry event. Agree view quickly weight arrive nearly.', 'gen_images/category/42.png', 3),
       ('Building', 'Miss true choose truth suddenly. Federal he should follow series argue. Star hear job.', 'gen_images/category/20.png', 3),
       ('Instead list', 'Whose table couple interesting because nearly mission.', 'gen_images/category/39.png', 7),
       ('Space individual', 'What may join interesting. National figure research plan example you theory. Still for since once form recognize. Time agree wear I.', 'gen_images/category/50.png', 10),
       ('More without', 'Woman American pass. Return bar focus model large memory. Become word purpose sign seat.', 'gen_images/category/4.png', 11),
       ('Allow certainly', 'Impact career production enter machine audience peace clear. There environmental must beat up machine character board.', 'gen_images/category/20.png', 13),
       ('Daughter tonight', 'Analysis able down goal. Current as middle perform occur.', 'gen_images/category/6.png', 19);
--  Products
ALTER SEQUENCE products_id_seq RESTART;

INSERT INTO products(name, description, full_description, price, current_stock,
                     bought, big_image_link, image_links, category_id,
                     rating, total_rated, address, created_date, color_options, size_options)
VALUES
('Her well bed speech', 'Wall morning product arm turn. Fast first food fact. Effort fly read. Serve especially every then those anyone cause. Though poor note college heart military again. Once there movie say. Some majority party imagine laugh. Campaign her hold baby former edge nothing Republican.', 'Beyond control girl include. Building check hold wife get its admit. Behavior risk perhaps leader air. Various doctor check red. Same water area. Your once miss ago reason fish child state. Father represent visit true whole. Speak full condition mouth worker how.', 2522.1444716753085, 1776, 149, 'assets/images/products/1.jpg', ARRAY['gen_images/product/1272.jpg',
    'gen_images/product/502.jpg'
    ], 1, 2.9257306782483714, 13441, '3713 Jasmine Path Apt. 649
Jonathanburgh, AL 70682', '2001-01-13 01:27:13', '["#3ae930", "#2fbd4c"]', '["L", "XL"]'),
('Point finish agree experience', 'Local book any add discussion peace oil. Style continue quite wall role. Identify network along doctor stop start lot. Cost take week father clear likely teacher.', 'Letter yourself money itself certainly race yard. Hope black themselves no early hard college kitchen. Suffer blue find picture nice. Degree record discover media. On in your themselves the wear. Space catch dinner. Group throughout major. Anyone attack might strategy car young Mrs with. Fine store leader visit kitchen. Wear allow data series. Say be protect dinner rule. Benefit cell return environment. Collection entire miss economy. Involve throw that. Marriage reach staff town read.', 1074.5912256402585, 362, 92, 'assets/images/products/2.jpg', ARRAY['gen_images/product/208.jpg'
    ], 1, 1.4312031861129202, 7986, '58857 Anderson Summit Suite 792
Michaelton, OR 80602', '2022-08-28 08:06:33', '["#c19c9c", "#0c7f53", "#afc7d2"]', '["XXL", "XL"]'),
('Finish send', 'Pattern serious student sign skin task especially. Rest store free give follow part sell. The team policy free personal one discuss. Wife either daughter quickly quickly. Production probably any place put agent military.', 'Respond pick before understand meet wind. Couple yourself take health commercial defense again. Move would cost make theory technology report. Theory eye style lead. Industry soon purpose sea list performance million.', 1996.4022974549487, 1272, 16, 'assets/images/products/3.jpg', ARRAY['gen_images/product/233.jpg'
    ], 1, 0.30005922168816146, 15119, '6571 Pruitt Greens Apt. 758
Brandonmouth, CT 69587', '2005-06-18 23:33:30', '["#45ed79", "#5c8d63", "#bc310b", "#f96763", "#e80b16"]', '["XS", "XL", "S"]'),
('Prevent be budget deep', 'Television early skin song beat lose participant. Ability best data. Might phone memory if name. Compare end discussion international woman after week. Itself go play improve friend nearly culture. Do music mouth whole. Candidate church then cultural. School defense true question hit during.', 'Per score field social step. Speak team structure what require bank. Memory born pick. Road personal next impact everybody prove. Still do spend parent theory. Long detail economic. Feel stop century enjoy. Group through become situation throw car develop. Heart discover clear end near. Range during specific deep. These establish lot. Ahead over just floor benefit sort explain.', 38.77647040243416, 1067, 106, 'assets/images/products/4.jpg', ARRAY['gen_images/product/597.jpg',
    'gen_images/product/218.jpg',
    'gen_images/product/977.jpg'
    ], 1, 1.1933829913410774, 10499, '744 Paul Ford Apt. 301
Lake Amanda, KS 34284', '2006-02-14 05:29:18', '["#2ee5d3", "#dbf886", "#075100"]', '["M"]'),
('Four tend site', 'Never man them ball billion its. Type idea soon. Accept time arrive once hold difficult into.', 'Someone eight create always reveal. Senior century know difficult work national brother. Common time song. Soon night meeting break direction large. Various same surface here contain technology. Out century happy soldier defense current. Politics firm my learn. Media world several daughter. Every idea degree team determine what yet. Indeed seven its report knowledge. Least talk age own. Power tree camera through establish. Standard win camera minute. Fine fast paper exist parent senior hear yourself. Organization especially put. Measure strong perform remain particular home. Need total drive take. Speak official institution ground color over. Too simple address relate enough. Also whatever attack save song expert drive.', 2019.709423308499, 4441, 187, 'assets/images/products/5.jpg', ARRAY['gen_images/product/362.jpg'
    ], 1, 0.0, 16260, '198 Kurt Fields
Hahnville, RI 52183', '1990-07-07 09:38:25', '["#02b182", "#547460", "#1d05e9", "#984978", "#48f11f"]', '["XS", "L"]'),
('Among quality structure capital alone', 'Door city agree. Factor nation moment modern what play environment. Side live likely concern most whose. Old fly against win.', 'Increase beyond cut interview often. So skill south maybe. Southern personal keep husband company. Voice tough among lot together. Amount by course analysis. North garden parent party them certain catch. Statement claim meet under. Week tough city artist.', 3774.7076338861143, 2479, 105, 'assets/images/products/6.jpg', NULL, 1, 0.013541090256188104, 17801, '3325 Barbara Track Apt. 534
Riddlechester, MT 52983', '1996-12-04 20:17:19', '["#38f628"]', '["L", "XXL", "XS", "XL", "S"]'),
('Blue third', 'Reflect camera seek loss peace place fly. Store air him behind. Arm family more exactly. Realize believe early happy behind. Market suggest sure. General power single. Some official region no call not.', 'Kid education few church. Both mean fight end. Move detail white night region teach add. Factor deep force rate buy.', 867.2500082016323, 3313, 198, 'assets/images/products/7.jpg', ARRAY['gen_images/product/478.jpg',
    'gen_images/product/1300.jpg'
    ], 1, 1.7764050210118651, 17830, '001 Campbell Mission
Watkinsmouth, ND 70578', '2030-03-23 15:35:51', '["#60f8cd"]', '["XS", "XXL", "S", "L", "XL"]'),
('Term season', 'Charge natural piece right senior. Boy scene group action. Phone production generation less no science answer. Seat upon management past feeling so five. Try relate real fill support we. Tax sound that easy read space moment.', 'Then think prove check available. Describe group experience person investment cold. Feeling night agreement actually he feeling reality help. Keep worker station able agent. Nice finish actually detail history radio hit. Wear behavior meet suggest well smile machine. Coach watch mother stuff. Establish well station piece eight ground rule. Whether source half pattern white. News stop protect phone bit job value. Away home wide yet. Situation never music whatever.', 3412.4678049925824, 819, 187, 'assets/images/products/8.jpg', ARRAY['gen_images/product/817.jpg',
    'gen_images/product/1463.jpg',
    'gen_images/product/472.jpg'
    ], 1, 1.9288650063403616, 4532, 'USCGC Yoder
FPO AE 93841', '2005-09-03 01:33:30', '["#f5000a", "#329549"]', '["L", "XS", "XL", "M", "S"]'),
('Research its', 'Seat run various voice. Statement every I whole window whose kind. Nation avoid draw break hold property. Else throw general trade. Record choice better large church task happy.', 'Reduce on quickly. Late drive nor skill cell environment. Edge discussion bed cover prevent mind. Political smile wife wrong apply. Writer up man wide. Sort south better market memory television. Move after less rate rather gas seat. Pressure build long raise born glass nor. Mouth enough contain assume thus education. Edge she throw lawyer good arm job. Sing site response level. Article several by work care single. Team society week agency message. Pay recent thing investment turn gas around. State choice control down out seven. Population success eye follow job movie. Partner truth about term. Center school piece world page history she.', 1049.2842499288167, 55, 18, 'gen_images/product/371.jpg', ARRAY['gen_images/product/277.jpg'
    ], 10, 2.5410278327600246, 19054, '050 Jason Plains Suite 802
Edwardmouth, KS 77380', '2005-05-28 10:20:20', '["#d0356b", "#cfbd89", "#910a50", "#d82585", "#779a35"]', '["XXL", "XL", "XXL", "XS", "S"]'),
('Dog author us whole certain', 'Raise same organization possible information network. Particularly able central best loss answer avoid. Rather girl none without base treat bring. Now late high point prevent discuss. Window church history add situation instead hit man. Position certainly second character bit million new.', 'Challenge quality try black relate clearly guess. Such one performance. Remember dream surface nor. Thank compare course assume very although perhaps. Artist personal new could father bag. Beat card serve word capital far.', 181.57300060058307, 2349, 123, 'gen_images/product/784.jpg', ARRAY['gen_images/product/305.jpg',
    'gen_images/product/743.jpg',
    'gen_images/product/1048.jpg'
    ], 19, 0.08499321431834794, 11003, '001 Horton View Apt. 858
Leehaven, CO 89789', '2012-12-01 17:06:39', '["#42e4b2", "#e7c4d7"]', '["XXL", "S", "XL"]')
;

--  Customers
ALTER SEQUENCE customers_id_seq RESTART;

INSERT INTO customers(first_name, last_name, email, password_hash, salt, gender, status)
VALUES
('test_first2', 'test_last2', 'test@ggg.cc', '$2b$12$KLGHpELUm.xBRvI86xY9KOMFIgLKXOvHYfdcjI.u5pBgAyOT19Hje', '$2b$12$KLGHpELUm.xBRvI86xY9KO', 'other', 'active'),
('test_first2', 'test_last2', 'test1@ggg.cc', '$2b$12$KLGHpELUm.xBRvI86xY9KOMFIgLKXOvHYfdcjI.u5pBgAyOT19Hje', '$2b$12$KLGHpELUm.xBRvI86xY9KO', 'other', 'active'),
('test_first2', 'test_last2', 'test2@ggg.cc', '$2b$12$KLGHpELUm.xBRvI86xY9KOMFIgLKXOvHYfdcjI.u5pBgAyOT19Hje', '$2b$12$KLGHpELUm.xBRvI86xY9KO', 'other', 'active'),
('Wheeler', 'Gerald', 'danny83@gmail.com', '$2b$12$WE.0qOdDkd35.y0BQvNQ3uMgV0GqgL73MNsonlnvbOWt6FB9QIxR.', '$2b$12$WE.0qOdDkd35.y0BQvNQ3u', 'other', 'pending'),
('Kennedy', 'Sarah', 'kdrake@chandler.com', '$2b$12$ponKhrP8TQYWsKwFDppnQ.m96qeaqJqUBw0EoFcU0qIew/e5W7tm.', '$2b$12$ponKhrP8TQYWsKwFDppnQ.', 'male', 'inactive'),
('Watkins', 'Timothy', 'williamselizabeth@gmail.com', '$2b$12$fsk23l0weCH84PePsCC81uq2fsrN6O.L5YJij8m11VfUSWX6RAZIu', '$2b$12$fsk23l0weCH84PePsCC81u', 'female', 'pending'),
('Duncan', 'Kimberly', 'mabbott@rosario.com', '$2b$12$Q2kvm1HSKHpBa.7uStHvb.RTmjh5IbilhSFpbq5hsZ7JpBlS.nAga', '$2b$12$Q2kvm1HSKHpBa.7uStHvb.', 'female', 'inactive'),
('King', 'Martin', 'dannyarias@williams.com', '$2b$12$V2RHyWJo6TIVzPSLWrQ2A.z6InuMwtQa0SRI9fBDSY/Sv.BpuNuEq', '$2b$12$V2RHyWJo6TIVzPSLWrQ2A.', 'other', 'active'),
('Brown', 'Ronald', 'olivia92@hotmail.com', '$2b$12$7uTYk0HgZbrTR4b0raVkaey5oc6gWs3mLlUVA26yi.ZTqziQMm9qi', '$2b$12$7uTYk0HgZbrTR4b0raVkae', 'female', 'active'),
('Fernandez', 'Michelle', 'chadmcclure@valentine.info', '$2b$12$8rYzohKMtSxmpwW1OGImCeXDO8QRwVLFXU/0lQOk2Bm0wFxEoqybG', '$2b$12$8rYzohKMtSxmpwW1OGImCe', 'female', 'pending'),
('Anderson', 'Melinda', 'smithdaniel@diaz.com', '$2b$12$jPAT6vvuI5NABAyfzpWMFOEKr9tnjN1REX15qgGHDCRV.A7LzFPju', '$2b$12$jPAT6vvuI5NABAyfzpWMFO', 'female', 'inactive'),
('Taylor', 'Jill', 'heidiking@yahoo.com', '$2b$12$HMc9SJKb0/hoML4DmFXVwurIqbLuGRcZJKNxQg48ssAU1y5iuH/gy', '$2b$12$HMc9SJKb0/hoML4DmFXVwu', 'male', 'pending'),
('Brown', 'Brian', 'briana96@carpenter.info', '$2b$12$F8XeYycSb3pugeWqsiKr9OgrervPUTigs3uooj1bh5FQRBK2mg9tC', '$2b$12$F8XeYycSb3pugeWqsiKr9O', 'female', 'active'),
('Jefferson', 'Steven', 'matthew31@davis-grant.com', '$2b$12$wltI4EcvxLCOFlGFLI8nzewTkSVt6EEBBl/25WYEuK03.hsWSCQ7e', '$2b$12$wltI4EcvxLCOFlGFLI8nze', 'female', 'pending'),
('Taylor', 'Zachary', 'kelly87@vargas.com', '$2b$12$tMtzkPX9b5NQgG2zw3Rq..F2Xg6NRKVhyvjVw5Zkal0rrSE8PZpLa', '$2b$12$tMtzkPX9b5NQgG2zw3Rq..', 'male', 'pending'),
('Graham', 'Duane', 'joselopez@hotmail.com', '$2b$12$8cJxT3hDTtGhmikZrnD6GeqV7qy6fAIMqkyJYrAGWBTo1X.3Bry2S', '$2b$12$8cJxT3hDTtGhmikZrnD6Ge', 'female', 'active'),
('Webster', 'James', 'lcurtis@gmail.com', '$2b$12$cMPvvQB/XtrDUhBeMFeKFOT4q6TGfK0eahPNUbeCa.PZFi49dprpa', '$2b$12$cMPvvQB/XtrDUhBeMFeKFO', 'male', 'pending'),
('Hicks', 'Michelle', 'jade50@yahoo.com', '$2b$12$kjMgy0UXVy0JA3AhdVlKgefZ.VhEJsxxTYlfh7bO8QroE8jK3B80K', '$2b$12$kjMgy0UXVy0JA3AhdVlKge', 'male', 'pending'),
('Barnes', 'Sarah', 'olsenomar@elliott.com', '$2b$12$Spu8EyKFKPyQOdDyb/PUT.isoSiw5nc21QBaCynQPAHkFCHUN80vG', '$2b$12$Spu8EyKFKPyQOdDyb/PUT.', 'female', 'inactive'),
('Fischer', 'Aaron', 'angelaburton@ross.com', '$2b$12$fns3mkeZoIJmAbYo2Jn.mOe.A7HPlZYY0IS7yNwbaOdWZkyVuojmO', '$2b$12$fns3mkeZoIJmAbYo2Jn.mO', 'male', 'active'),
('Perez', 'Gary', 'robertpatterson@scott-thompson.org', '$2b$12$7nAOu8XJSCHrylp3h2dawemto29.X6tVPKdKC6vflcX3EVWvX8g22', '$2b$12$7nAOu8XJSCHrylp3h2dawe', 'female', 'active'),
('Cross', 'Johnny', 'rroth@gmail.com', '$2b$12$AsPvOcobkA4uPNc3teqGdulWYqq8PyS3R56i3CnLj15t9Rbdcu8hS', '$2b$12$AsPvOcobkA4uPNc3teqGdu', 'male', 'inactive'),
('Burke', 'Daisy', 'santiagojeffrey@pierce.com', '$2b$12$mGafJ7BQaNrYsUValsdqHu8edIaVgWmYetF7Gw6OV3M81CMIoZZay', '$2b$12$mGafJ7BQaNrYsUValsdqHu', 'female', 'inactive')
;

--  Reviews
INSERT INTO reviews(customer_id, product_id, value, created_date)
VALUES
(8, 8, 'Thought seek magazine. Feeling little pick lose now. Base have fact American guess candidate.', '2002-06-17 11:26:15'),
(3, 10, 'Guy relationship far. Foot especially kid ever control.', '1990-05-26 06:06:14'),
(16, 8, 'Nearly me soldier investment star have maintain. Thing production very talk religious program. Raise public high personal.', '2000-11-25 12:48:18'),
(7, 8, 'Audience house never unit yet figure prove. Him one family staff.', '2025-02-26 12:36:57'),
(20, 6, 'Project star well its why. Contain pretty discuss authority deep issue cut.', '1999-11-13 02:39:08'),
(11, 1, 'That behavior information figure it. Order result much man.', '1998-03-27 21:41:25'),
(20, 8, 'Nature experience avoid. As lay family. Quality gas forward quality let thousand while.', '2019-11-13 19:16:26'),
(16, 6, 'Four middle low issue cell.', '2013-04-06 05:08:46'),
(19, 8, 'Would suggest raise down shoulder sign want main. Single surface answer represent.', '2016-04-21 14:49:29'),
(10, 5, 'Practice pull exactly save article. Include second glass provide music.', '1995-06-05 03:50:08')
;

--  Shippings
ALTER SEQUENCE shipping_methods_id_seq RESTART;

INSERT INTO shipping_methods(name, description, price_type, price)
VALUES
('normal', 'ship your order through post office', 'flat', 10),
('fast', 'ship with higher priority', 'percent', 5),
('extra-fast', 'ship with top priority', 'percent', 15),
('exclusive', 'personally customized delivery', 'percent', 35)
;

--  Admins
ALTER SEQUENCE admins_id_seq RESTART;

INSERT INTO admins(email,  name, password_hash, salt)
VALUES ('admin1@clt.io', 'admin1', '$2b$12$tptGtFgbMuU2TxURTlVPC.68RTbPlm4BKIMV1LCDY6/oPNsGkdDG6', '$2b$12$tptGtFgbMuU2TxURTlVPC.'),
       ('admin2@clt.io', 'admin2', '$2b$12$tptGtFgbMuU2TxURTlVPC.68RTbPlm4BKIMV1LCDY6/oPNsGkdDG6', '$2b$12$tptGtFgbMuU2TxURTlVPC.'),
       ('admin3@clt.io', 'admin3', '$2b$12$tptGtFgbMuU2TxURTlVPC.68RTbPlm4BKIMV1LCDY6/oPNsGkdDG6', '$2b$12$tptGtFgbMuU2TxURTlVPC.'),
       ('admin4@clt.io', 'admin4', '$2b$12$tptGtFgbMuU2TxURTlVPC.68RTbPlm4BKIMV1LCDY6/oPNsGkdDG6', '$2b$12$tptGtFgbMuU2TxURTlVPC.')

; COMMIT;