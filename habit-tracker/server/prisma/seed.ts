import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const firstHabitId = "9789adb8-dbad-4c70-9bad-7c10652d775f"
const secondHabitId = "748d40e8-17c4-4343-bb99-405cc80ac247"

async function run() {
  await prisma.habit.deleteMany({})
  await prisma.day.deleteMany({})

  await Promise.all([
    prisma.habit.create({
      data: {
        id: firstHabitId,
        title: "Drink 2l of water",
        weekDays: {
          create: [{ weekDay: 1 }, { weekDay: 2 }, { weekDay: 3 }]
        }
      }
    }),
    prisma.habit.create({
      data: {
        id: secondHabitId,
        title: "Sleep 8h",
        weekDays: {
          create: [{ weekDay: 3 }, { weekDay: 4 }, { weekDay: 5 }]
        }
      }
    }),
    prisma.habit.create({
      data: {
        title: "Workout",
        weekDays: {
          create: [{ weekDay: 1 }, { weekDay: 2 }, { weekDay: 3 }, { weekDay: 4 }, { weekDay: 5 }]
        }
      }
    })
  ])
  await Promise.all([
    prisma.day.create({
      data: {
        date: new Date("2023-01-02"),
        dayHabits: {
          create: {
            habitId: firstHabitId
          }
        }
      }
    }),
    prisma.day.create({
      data: {
        date: new Date("2023-01-06"),
        dayHabits: {
          create: {
            habitId: firstHabitId
          }
        }
      }
    }),
    prisma.day.create({
      data: {
        date: new Date("2023-01-04"),
        dayHabits: {
          create: [{ habitId: firstHabitId }, { habitId: secondHabitId }]
        }
      }
    })
  ])
}

run()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
