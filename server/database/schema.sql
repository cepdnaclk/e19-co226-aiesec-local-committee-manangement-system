/* Naming Conventions
   Adapted from: https://github.com/RootSoft/Database-Naming-Convention
    tables, views, columns
        => singular
        => lowercase
        => seperated by _ (snake_case)
        => AVOID QUOTED IDENTIFIERS ("date", "First Name")
        => full words, no abbreviations unless they are common (like id)
        => no reserved words
    primary keys
        => single column primary key fields should be named id
    foreign keys
        => should be a combination of the name of the referenced table and the name of the referenced fields
*/

/*DROP DATABASE IF EXISTS LC_KANDY;*/

CREATE DATABASE LC_KANDY;

USE LC_KANDY;

CREATE TABLE faculty (
    
    id VARCHAR(3) UNIQUE PRIMARY KEY,
    title VARCHAR(100)
);

CREATE TABLE district (
    id INT(2) AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50)
);

CREATE TABLE role (
    id INT(2) PRIMARY KEY,
    title VARCHAR(50),
    abbreviation VARCHAR(4)
);

/* =============== FRONT OFFICE TABLE =============== */
CREATE TABLE fo (
    id         INT(2) PRIMARY KEY,
    title          VARCHAR(50),
    abbreviation    VARCHAR(4)
);

/* =============== BACK OFFICE TABLE =============== */
CREATE TABLE bo (
    id         INT(2) PRIMARY KEY,
    title          VARCHAR(50),
    abbreviation    VARCHAR(4)
);

/* =============== DEPARTMENTS TABLE =============== */
CREATE TABLE department (
    id         INT(2) PRIMARY KEY,
    title           VARCHAR(25),
    abbreviation    VARCHAR(10)
);

/* =============== VALID PAIRS (FUNCTS-DEPTS) TABLE =============== */
CREATE TABLE valid_pair (
    functional_area_id INT(2),
    department_id INT(2),

    FOREIGN KEY (functional_area_id) REFERENCES functional_area(id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

/* =============== MEMEBERS MASTER TABLE =============== */
CREATE TABLE member (

    id       INT(5) AUTO_INCREMENT PRIMARY KEY,

    #login details
    email  VARCHAR(255) UNIQUE NOT NULL,
    passphrase   VARCHAR(20)  NOT NULL,

    #member details
    full_name       VARCHAR(100),
    preferred_name  VARCHAR(30),
    functional_area_id     INT(2),
    department_id         INT(3),
    # find term
    joined_date    DATE,
    role_id     INT(2),
    contact_no     VARCHAR(12),
    aiesec_email    VARCHAR(255),
    gender          CHAR(1),
    nic             INT(12),
    birth_date      DATE,
    facebook_link   VARCHAR(255),
    linkedin_link   VARCHAR(255),
    instagram_link  VARCHAR(255),
    register_no        VARCHAR(12) UNIQUE,
    school_name     VARCHAR(50),
    home_address    VARCHAR(100),
    home_contact    VARCHAR(12),
    district_id        INT(2),
    photo_link      VARCHAR(255),
    boarding_address VARCHAR(100),
    FOREIGN KEY (functional_area_id) REFERENCES functional_area(id),
    FOREIGN KEY (department_id) REFERENCES department(id),
    FOREIGN KEY (district_id) REFERENCES district(id),
    FOREIGN KEY (role_id) REFERENCES role(id)
);


/* =============== TERMS TABLE =============== */
CREATE TABLE term (
    title VARCHAR(10) PRIMARY KEY NOT NULL, #yy-Summer/Winter
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    newbie_recruitment_date DATE NOT NULL
);

/* =============== TEAMS TABLE =============== */

# iGV Data Tables

/* CREATE TABLE IF NOT EXISTS IGV_PROJECTS (

    Opportunity_id          INT(),
) */