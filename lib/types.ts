export type User = {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  salt: string;
  hash: string;
  createdAt: Date;
  id: string;
};

// id               String         @id @default(cuid())
// createdAt        DateTime       @default(now())
// updatedAt        DateTime       @updatedAt
// firstName        String
// lastName         String
// email            String?
// notes            String[]
// age              Int?
// homeNumber       String?
// cellNumber       String?
// stripeCustomerId String?
// address          ClientAddress? @relation(fields: [addressId], references: [id])
// addressId        String?        @unique
// image            String?
