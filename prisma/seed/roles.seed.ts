import { PrismaClient } from "@prisma/client";
import { existsSync, readFileSync } from "fs";

type Name = "admin" | "user";

type Role = {
    value: number;
    name: Name;
}

export const seedRoles = async (prisma: PrismaClient) => {
    const path = `prisma/seed/data/roles.json`;
    if (!existsSync(path)) return;
    console.log(`\nseeding for roles\n`);
    const roles = JSON.parse(readFileSync(path, 'utf-8')) as Role[];

    for await (const role of roles) {
        const existingRole = await prisma.roles.findFirst({
            where: {
                AND: [
                    { name: role.name },
                    { value: role.value },
                ]
            }
        });

        if (existingRole) {
            console.log(`name: ${role.name} already exists, skipping...`);
            continue;
        }

        await prisma.roles.create({
            data: {
                name: role.name,
                value: role.value,
            }
        });

        console.log(`name: ${role.name} seeded ✅`);
    }
}
