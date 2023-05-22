/*
  Warnings:

  - You are about to drop the `Booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BookingsOnTables` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Cuisine` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Restaurant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Table` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_restaurant_id_fkey";

-- DropForeignKey
ALTER TABLE "BookingsOnTables" DROP CONSTRAINT "BookingsOnTables_booking_id_fkey";

-- DropForeignKey
ALTER TABLE "BookingsOnTables" DROP CONSTRAINT "BookingsOnTables_table_id_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_restaurant_id_fkey";

-- DropForeignKey
ALTER TABLE "Restaurant" DROP CONSTRAINT "Restaurant_cuisine_id_fkey";

-- DropForeignKey
ALTER TABLE "Restaurant" DROP CONSTRAINT "Restaurant_location_id_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_restaurant_id_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Table" DROP CONSTRAINT "Table_restaurant_id_fkey";

-- DropTable
DROP TABLE "Booking";

-- DropTable
DROP TABLE "BookingsOnTables";

-- DropTable
DROP TABLE "Cuisine";

-- DropTable
DROP TABLE "Item";

-- DropTable
DROP TABLE "Location";

-- DropTable
DROP TABLE "Restaurant";

-- DropTable
DROP TABLE "Review";

-- DropTable
DROP TABLE "Table";

-- DropEnum
DROP TYPE "PRICE";
