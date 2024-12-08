CREATE TYPE "public"."blockType" AS ENUM('TEXT', 'AUDIO', 'OPEN_QUESTION', 'MULTIPLE_CHOICE_QUESTION');--> statement-breakpoint
CREATE TYPE "public"."language" AS ENUM('ENGLISH', 'ITALIAN', 'FRENCH', 'GERMAN', 'SPANISH', 'PORTUGUESE');--> statement-breakpoint
CREATE TYPE "public"."level" AS ENUM('BASIC', 'INTERMEDIATE', 'ADVANCED');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('PENDING', 'READY');--> statement-breakpoint
CREATE TYPE "public"."topics" AS ENUM('BOOKS', 'MOVIES', 'SPORTS', 'CURRENT_AFFAIRS', 'SCIENCE_AND_TECHNOLOGY', 'CULTURE', 'POLITICS');--> statement-breakpoint
CREATE TYPE "public"."type" AS ENUM('READING', 'LISTENING');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "activities" (
	"id" varchar PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"requesting_user_id" varchar NOT NULL,
	"activity_base_id" varchar NOT NULL,
	"title" varchar(100)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "activitiesBlocks" (
	"id" varchar PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"activity_base_id" varchar,
	"activity_id" varchar,
	"blockType" "blockType" NOT NULL,
	"data" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "activitiesGenerated" (
	"id" varchar PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"language" "language" NOT NULL,
	"topics" "topics"[] NOT NULL,
	"type" "type" NOT NULL,
	"level" "level" NOT NULL,
	"status" "status" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "studentOutput" (
	"id" varchar PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"reviewer_email" varchar NOT NULL,
	"activityId" varchar NOT NULL,
	"student_email" varchar NOT NULL,
	"status" "status" NOT NULL,
	"answers" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"firstName" varchar(100) NOT NULL,
	"lastName" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL,
	"counter" integer,
	"subscription_ends_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "activities" ADD CONSTRAINT "activities_requesting_user_id_users_id_fk" FOREIGN KEY ("requesting_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "activities" ADD CONSTRAINT "activities_activity_base_id_activitiesGenerated_id_fk" FOREIGN KEY ("activity_base_id") REFERENCES "public"."activitiesGenerated"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "activitiesBlocks" ADD CONSTRAINT "activitiesBlocks_activity_base_id_activitiesGenerated_id_fk" FOREIGN KEY ("activity_base_id") REFERENCES "public"."activitiesGenerated"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "activitiesBlocks" ADD CONSTRAINT "activitiesBlocks_activity_id_activities_id_fk" FOREIGN KEY ("activity_id") REFERENCES "public"."activities"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "studentOutput" ADD CONSTRAINT "studentOutput_activityId_activities_id_fk" FOREIGN KEY ("activityId") REFERENCES "public"."activities"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
