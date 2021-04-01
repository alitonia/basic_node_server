
--  Categories

START TRANSACTION;

DELETE
FROM categories;

ALTER SEQUENCE categories_id_seq RESTART;

INSERT INTO categories(name, description, image_link, sub_categories)
VALUES
('Prepare', 'Number rule simple four play growth. Hot recent seven tell half. Star human assume recognize give idea.', 'images/105.jpg', NULL),
('Soon son', 'Organization leave whatever somebody finish real.', 'images/94.jpg', NULL),
('Whole', 'Owner sound natural point wide wide similar. Imagine present people put. Culture expect laugh trouble sometimes. Actually view four occur director animal.', 'images/147.jpg', ARRAY[1, 0]),
('Without risk', 'Particularly Congress money continue production. Region on wind agency mission my pressure.', 'images/108.jpg', NULL),
('Usually same', 'Energy remember way tough firm. Court well street there. Change glass response trade amount explain will.', 'images/10.jpg', NULL),
('Argue leave', 'Decade price popular enough. Course machine party need civil. Hotel create several person individual city.', 'images/31.jpg', ARRAY[2]),
('Manager', 'Focus air outside political film wall national sit. Different figure key here PM century. Several door spend beat really. Beat use man standard traditional you.', 'images/68.jpg', ARRAY[5, 4, 3]),
('Always', 'Her police box drug appear so defense movement. Oil bill task wear media. Public amount night fast chance letter ball their.', 'images/134.jpg', NULL),
('Run major leader', 'So class sell positive.', 'images/136.jpg', ARRAY[6]),
('Represent son', 'Pull sell agent international society bill. Ball address federal process. Church culture bad nearly treatment.', 'images/132.jpg', ARRAY[7, 8]),
('Participant', 'Type thus issue quite indeed. Left season available attack power carry event. Agree view quickly weight arrive nearly. Suddenly wind when miss.', 'images/8.jpg', ARRAY[9]),
('Whom', 'Ready according surface federal. Although professional actually owner become social.', 'images/76.jpg', NULL),
('Star hear job', 'List activity whose table couple interesting. Whom policy six citizen. Those style what may join.', 'images/114.jpg', ARRAY[10]),
('Interesting wear national', 'Research plan example you. Happen yet agency guess option trial democratic.', 'images/22.jpg', NULL),
('Time agree', 'Ready huge although human woman American. Wide return bar focus model large memory degree.', 'images/18.jpg', ARRAY[11, 12]),
('Least one', 'Allow certainly direction per clearly cut. Hit full health democratic station. Environmental must beat up machine character board.', 'images/130.jpg', NULL),
('Democratic', 'Charge produce area skin. Finally prevent room institution.', 'images/123.jpg', NULL),
('Modern type room', 'Current continue strategy require. Year travel right drug fast first food. Trip effort fly read politics.', 'images/47.jpg', ARRAY[13, 15]),
('Number', 'Movie alone follow strategy various. Market material some gas over win. Key once there. Himself financial some majority party imagine laugh.', 'images/15.jpg', NULL),
('Sense', 'Hot second condition end. Edge nothing Republican economy. Performance candidate question can. Pretty mean recognize usually.', 'images/70.jpg', NULL);
COMMIT;
