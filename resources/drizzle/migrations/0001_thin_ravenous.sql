ALTER TABLE `user_submissions` DROP FOREIGN KEY `user_submissions_user_id_user_table_id_fk`;
--> statement-breakpoint
ALTER TABLE `quiz_question` MODIFY COLUMN `section_id` varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE `user_submissions` ADD CONSTRAINT `user_submissions_user_id_user_table_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user_table`(`id`) ON DELETE cascade ON UPDATE cascade;