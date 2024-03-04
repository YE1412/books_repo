INSERT INTO books(`title`, `author`, `isbn`, `pages_num`) VALUES ('ALittleTitleForSpringBoot Book', 'M. Chords', '6154438908973', 250);
INSERT INTO books(`title`, `author`, `isbn`, `pages_num`) VALUES ('ABigTitleForSpringBoot Book', 'M. Chords', '1897627878989', 500);
INSERT INTO books(`title`, `author`, `isbn`, `pages_num`) VALUES ('For All Mankind', 'M. Baldwin', '5378915497582', 105);
INSERT INTO books(`title`, `author`, `isbn`, `pages_num`) VALUES ('Monkey Doll', 'Jean De La Fontaine', '9134761097342', 570);
INSERT INTO books(`title`, `author`, `isbn`, `pages_num`) VALUES ('Back For Blood', 'Mickaël Thorn', '4036512849301', 302);
INSERT INTO books(`title`, `author`, `isbn`, `pages_num`) VALUES ('ALittleTitle For A Big Content', 'Altin Backbones', '7123095341987', 55);
INSERT INTO books(`title`, `author`, `isbn`, `pages_num`) VALUES ('Forest Gump', 'G. Thomas', '7163098317623', 125);
INSERT INTO books(`title`, `author`, `isbn`, `pages_num`) VALUES ('Foncky Cops', 'Little Bradley', '2839710936257', 76);
INSERT INTO books(`title`, `author`, `isbn`, `pages_num`) VALUES ('Paladin', 'M. Chords', '6314279802654', 87);
INSERT INTO books(`title`, `author`, `isbn`, `pages_num`) VALUES ('Trocadero', 'M. Chords', '3541863547096', 256);

INSERT INTO roles(`name`) VALUES ('ROLE_ADMIN');
INSERT INTO roles(`name`) VALUES ('ROLE_USER');

INSERT INTO users(`name`, `username`, `email`, `password`) VALUES ('Arealadmin', 'admin', 'admin@admin.fr', '$2a$10$ZpEmtM7Exn7PXLtxq5w8cO40eDrEa9ztEKBInYbwyxeyAZ9vVCdMa');
INSERT INTO users(`name`, `username`, `email`, `password`) VALUES ('Arealuser', 'user', 'user@user.fr', '$2a$10$f4CiDF1bxMj/wT03kxwi6ejsIZkEMIXbLV9IAkX1kMlgH8oY/YUsy');

INSERT INTO users_roles(`user_id`, `role_id`) VALUES (1, 1);
INSERT INTO users_roles(`user_id`, `role_id`) VALUES (2, 2);