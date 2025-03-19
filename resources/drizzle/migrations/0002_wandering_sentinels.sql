ALTER TABLE `user_submissions` MODIFY COLUMN `user_id` varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE `user_submissions` ADD `quiz_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `user_submissions` ADD CONSTRAINT `user_submissions_quiz_id_quiz_id_fk` FOREIGN KEY (`quiz_id`) REFERENCES `quiz`(`id`) ON DELETE cascade ON UPDATE cascade;