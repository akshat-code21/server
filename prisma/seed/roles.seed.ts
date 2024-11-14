import { PrismaClient } from "@prisma/client";
import { existsSync, readFileSync } from "fs";

type Name = "admin" | "user";

type Role = {
    value: number;
    name: Name;
}

export const seedRoles = async (prisma: PrismaClient) => {
    const path = `prisma/seed/data/roles.json`;
    if (!existsSync(path)) {
        console.log(`Roles data file not found at ${path}, skipping seeding.`);
        return;
    }

    console.log(`\nSeeding roles...\n`);
    const roles = JSON.parse(readFileSync(path, 'utf-8')) as Role[];

    for (const role of roles) {
        const existingRole = await prisma.roles.findFirst({
            where: { value: role.value },
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
    }
};
