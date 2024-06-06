#! Start of File

# Prisma
echo "Starting Prisma Script..."
npx prisma db push

sleep 3

npx prisma generate