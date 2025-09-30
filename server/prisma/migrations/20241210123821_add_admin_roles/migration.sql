-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'SUPERADMIN');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED');

-- CreateTable
CREATE TABLE "Admin" (
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "regNo" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "mobileNo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "birthTime" TEXT,
    "birthPlace" TEXT,
    "education" TEXT NOT NULL,
    "job" TEXT NOT NULL,
    "organization" TEXT,
    "height" DOUBLE PRECISION,
    "weight" DOUBLE PRECISION,
    "color" TEXT,
    "income" DOUBLE PRECISION,
    "maritalStatus" "MaritalStatus" NOT NULL,
    "ownHouse" BOOLEAN NOT NULL,
    "casteId" TEXT NOT NULL,
    "communityId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "presentAddressId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Caste" (
    "casteId" TEXT NOT NULL,
    "casteName" TEXT NOT NULL,

    CONSTRAINT "Caste_pkey" PRIMARY KEY ("casteId")
);

-- CreateTable
CREATE TABLE "Community" (
    "communityId" TEXT NOT NULL,
    "communityName" TEXT NOT NULL,

    CONSTRAINT "Community_pkey" PRIMARY KEY ("communityId")
);

-- CreateTable
CREATE TABLE "Address" (
    "addressId" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("addressId")
);

-- CreateTable
CREATE TABLE "Jathagam" (
    "jathagamId" TEXT NOT NULL,
    "rasi" TEXT NOT NULL,
    "natchathiram" TEXT NOT NULL,
    "lagnam" TEXT NOT NULL,
    "dosham" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Jathagam_pkey" PRIMARY KEY ("jathagamId")
);

-- CreateTable
CREATE TABLE "Sibling" (
    "siblingId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Sibling_pkey" PRIMARY KEY ("siblingId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_regNo_key" ON "User"("regNo");

-- CreateIndex
CREATE UNIQUE INDEX "User_mobileNo_key" ON "User"("mobileNo");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Jathagam_userId_key" ON "Jathagam"("userId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_casteId_fkey" FOREIGN KEY ("casteId") REFERENCES "Caste"("casteId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("communityId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_presentAddressId_fkey" FOREIGN KEY ("presentAddressId") REFERENCES "Address"("addressId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jathagam" ADD CONSTRAINT "Jathagam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sibling" ADD CONSTRAINT "Sibling_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
