CREATE TABLE `answer` (
	`id` varchar(50) NOT NULL,
	`submission_id` varchar(50) NOT NULL,
	`question_id` varchar(50) NOT NULL,
	`answer` text NOT NULL,
	CONSTRAINT `answer_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quiz_question` (
	`id` varchar(50) NOT NULL,
	`question` varchar(255) NOT NULL,
	`section_id` varchar(50),
	`sub_section_id` varchar(50),
	`created_at` datetime DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `quiz_question_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quiz` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`created_at` datetime DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `quiz_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quiz_section` (
	`id` varchar(50) NOT NULL,
	`quiz_id` int,
	`title` varchar(255) NOT NULL,
	`description` text,
	`created_at` datetime DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `quiz_section_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quiz_sub_section` (
	`id` varchar(50) NOT NULL,
	`section_id` varchar(50),
	`title` varchar(255) NOT NULL,
	`created_at` datetime DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `quiz_sub_section_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_submissions` (
	`id` varchar(50) NOT NULL,
	`user_id` varchar(50),
	`created_at` datetime DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `user_submissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_table` (
	`id` varchar(50) NOT NULL,
	`full_name` varchar(255) NOT NULL,
	`phone` varchar(20),
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`gender` enum('male','female') NOT NULL DEFAULT 'male',
	`avatar` varchar(255),
	`is_email_verified` boolean NOT NULL DEFAULT false,
	`is_super_admin` boolean NOT NULL DEFAULT false,
	`country_code` varchar(5) NOT NULL DEFAULT 'BD',
	`city` varchar(50),
	`state` varchar(50),
	`zip_code` varchar(50),
	`address` varchar(255),
	`time_zone` varchar(50) NOT NULL DEFAULT 'Asia/Dhaka',
	`fcm_token` varchar(255),
	`last_logged_in` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `user_table_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_table_phone_unique` UNIQUE(`phone`),
	CONSTRAINT `user_table_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `answer` ADD CONSTRAINT `answer_submission_id_user_submissions_id_fk` FOREIGN KEY (`submission_id`) REFERENCES `user_submissions`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `answer` ADD CONSTRAINT `answer_question_id_quiz_question_id_fk` FOREIGN KEY (`question_id`) REFERENCES `quiz_question`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `quiz_question` ADD CONSTRAINT `quiz_question_section_id_quiz_section_id_fk` FOREIGN KEY (`section_id`) REFERENCES `quiz_section`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `quiz_question` ADD CONSTRAINT `quiz_question_sub_section_id_quiz_sub_section_id_fk` FOREIGN KEY (`sub_section_id`) REFERENCES `quiz_sub_section`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `quiz_section` ADD CONSTRAINT `quiz_section_quiz_id_quiz_id_fk` FOREIGN KEY (`quiz_id`) REFERENCES `quiz`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `quiz_sub_section` ADD CONSTRAINT `quiz_sub_section_section_id_quiz_section_id_fk` FOREIGN KEY (`section_id`) REFERENCES `quiz_section`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `user_submissions` ADD CONSTRAINT `user_submissions_user_id_user_table_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user_table`(`id`) ON DELETE no action ON UPDATE no action;