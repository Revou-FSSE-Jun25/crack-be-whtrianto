import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  /* =======================
     AIRCRAFT
  ======================= */
  await prisma.aircraft.createMany({
    data: [
      { name: 'Garuda Indonesia', type: 'Boeing 737' },
      { name: 'Singapore Airlines', type: null },
      { name: 'Lion Air', type: null },
      { name: 'AirAsia', type: null },
      { name: 'Thai Airways', type: null },
      { name: 'Virgin Australia', type: null },
      { name: 'Batik Air', type: null },
      { name: 'Saudia Airlines', type: null },
    ],
    skipDuplicates: true,
  })

  /* =======================
     DESTINATION
  ======================= */
  await prisma.destination.createMany({
    data: [
      {
        name: 'Soekarno–Hatta International Airport (Jakarta) → Haneda International Airport (Tokyo)',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/TerminalsSoekarnoHatta.jpg/250px-TerminalsSoekarnoHatta.jpg',
      },
      {
        name: 'Soekarno–Hatta (CGK), Jakarta → Ngurah Rai (DPS), Bali',
        image: null,
      },
      {
        name: 'Ngurah Rai International Airport (Bali) → Soekarno–Hatta International Airport (Jakarta)',
        image: null,
      },
      {
        name: 'Singapore Changi Airport (Singapore) → Soekarno–Hatta International Airport (Jakarta)',
        image: null,
      },
      {
        name: 'Suvarnabhumi International Airport (Bangkok) → Ngurah Rai International Airport (Bali)',
        image: null,
      },
      {
        name: 'Sydney Kingsford Smith International Airport (Sydney) → Ngurah Rai International Airport (Bali)',
        image: null,
      },
      {
        name: 'Soekarno–Hatta International Airport (Jakarta) → King Abdulaziz International Airport (Jeddah – Makkah Route)',
        image: null,
      },
    ],
    skipDuplicates: true,
  })

  /* =======================
     USER (PASSWORD SUDAH HASH)
  ======================= */
  await prisma.user.createMany({
    data: [
      {
        name: 'user',
        email: 'user@revou',
        password:
          '$2b$10$hGmSHi41isGKYhb2jOgUYeXYRvbRGChkiPMHa03chcyBPrJAIKYeW',
        role: 'user',
      },
      {
        name: 'admin',
        email: 'admin@revou',
        password:
          '$2b$10$1izHGW6vQ7XMrwSF56Qmo.e9LYeRJ2bxtPoaMXNQY.UhawGkx0see',
        role: 'admin',
      },
      {
        name: 'user1',
        email: 'user1@revou',
        password:
          '$2b$10$AwH3FXvKBLZYkXQFV1XBcudvsEBDxw.9essoqA1nn71AQX590Baja',
        role: 'user',
      },
      {
        name: 'anto',
        email: 'anto@revou',
        password:
          '$2b$10$PUcN8phuxWsu9wkTbeWR9.DV78H6TNUpiyQNmYK.SDJX4LqrSx.XS',
        role: 'user',
      },
    ],
    skipDuplicates: true,
  })

  /* =======================
     SERVICE
  ======================= */
  await prisma.service.createMany({
    data: [
      {
        name:
          'Soekarno–Hatta International Airport (Jakarta) → King Abdulaziz International Airport (Jeddah – Makkah Route)',
        description: 'Batik Air',
        price: 2000000,
        flightDate: new Date('2025-11-14T00:00:00.000Z'),
      },
      {
        name:
          'Sydney Kingsford Smith International Airport (Sydney) → Ngurah Rai International Airport (Bali)',
        description: 'Virgin Australia',
        price: 1200000,
        flightDate: new Date('2026-01-20T01:33:00.000Z'),
      },
      {
        name:
          'Suvarnabhumi International Airport (Bangkok) → Ngurah Rai International Airport (Bali)',
        description: 'Thai Airways',
        price: 1100000,
        flightDate: new Date('2026-01-20T02:35:00.000Z'),
      },
      {
        name:
          'Singapore Changi Airport (Singapore) → Soekarno–Hatta International Airport (Jakarta)',
        description: 'Lion Air',
        price: 700000,
        flightDate: new Date('2026-01-19T18:40:00.000Z'),
      },
      {
        name:
          'Ngurah Rai International Airport (Bali) → Soekarno–Hatta International Airport (Jakarta)',
        description: 'AirAsia',
        price: 1000000,
        flightDate: new Date('2026-01-22T01:40:00.000Z'),
      },
      {
        name: 'Soekarno–Hatta (CGK), Jakarta → Ngurah Rai (DPS), Bali',
        description: 'Garuda Indonesia',
        price: 1100000,
        flightDate: new Date('2026-01-20T03:40:00.000Z'),
      },
      {
        name:
          'Soekarno–Hatta International Airport (Jakarta) → Haneda International Airport (Tokyo)',
        description: 'AirAsia',
        price: 2500000,
        flightDate: new Date('2026-01-19T17:40:00.000Z'),
      },
    ],
    skipDuplicates: true,
  })

  console.log('✅ Semua data SQL berhasil dimigrasikan ke Prisma Seed')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
