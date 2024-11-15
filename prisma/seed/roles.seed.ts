import { PrismaClient } from "@prisma/client";
import { existsSync, readFileSync } from "fs";

type Name = "admin" | "user";

type Role = {
    value: number;
    name: Name;
};

export const seedRoles = async (prisma: PrismaClient) => {
    const path = `prisma/seed/data/roles.json`;
    if (!existsSync(path)) {
        console.log(`Roles data file not found at ${path}, skipping seeding.`);
        return;
    }

    console.log(`\nSeeding roles...\n`);
    let roles: Role[];
    try {
        const fileData = readFileSync(path, "utf-8");
        roles = JSON.parse(fileData) as Role[];
    } catch (error) {
        console.error(`Error reading or parsing ${path}:`, error);
        return;
    }

    for (const role of roles) {
        try {
            const existingRole = await prisma.roles.findFirst({
                where: { OR: [{ value: role.value }, { name: role.name }] },
            });

            if (!existingRole) {
                await prisma.roles.create({
                    data: {
                        name: role.name,
                        value: role.value,
                    },
                });
                console.log(`Role "${role.name}" with value "${role.value}" seeded ✅`);
            } else {
                console.log(`Role "${role.name}" with value "${role.value}" already exists, skipping...`);
            }
        } catch (error) {
            console.error(`Error seeding role "${role.name}" with value "${role.value}":`, error);
        }
    }
};
