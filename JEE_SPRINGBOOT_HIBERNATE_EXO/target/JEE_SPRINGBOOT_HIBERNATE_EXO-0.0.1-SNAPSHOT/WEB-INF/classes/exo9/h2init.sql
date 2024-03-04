DROP TABLE IF EXISTS files_data;

CREATE TABLE files_data(
    id BIGINT AUTO_INCREMENT NOT NULL,
    file_name VARCHAR(50) NOT NULL,
    extension VARCHAR(10) NOT NULL,
    size_in_kb BIGINT NOT NULL,
    content VARCHAR(150) NOT NULL,
    CONSTRAINT `PK_FILE_DATA`
        PRIMARY KEY (id)
);

