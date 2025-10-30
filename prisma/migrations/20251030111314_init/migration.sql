-- CreateTable
CREATE TABLE "InvestmentGoal" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "months" TEXT[],
    "value" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InvestmentGoal_pkey" PRIMARY KEY ("id")
);
