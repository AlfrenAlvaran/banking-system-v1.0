import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// export const AuthFormSchema = (type) => z.object({
//   firstName: type === "sign-up" ? z.string().optional() : z.string().max(20),
//   lastName: type === "sign-up" ? z.string().optional() : z.string().max(20),
//   address: type === "sign-up" ? z.string().optional() : z.string().max(200),
//   state: type === "sign-up" ? z.string().optional() : z.string().max(6),
//   postal: type === "sign-up" ? z.string().optional() : z.string().max(4),
//   BOD: type === "sign-up" ? z.string().optional() : z.string().max(12),
//   ssn: type === "sign-up" ? z.string().optional() : z.string().max(4),

//   email: z.string().email(),
//   password: z.string().min(8),
// });
export const AuthFormSchema = (type) => {
  return z.object({
      firstName: type === "sign-up" ? z.string().min(1, "First name is required") : z.string().optional(),
      lastName: type === "sign-up" ? z.string().min(1, "Last name is required") : z.string().optional(),
      address: type === "sign-up" ? z.string().min(1, "Address is required") : z.string().optional(),
      state: type === "sign-up" ? z.string().min(1, "State is required") : z.string().optional(),
      postal: type === "sign-up" ? z.string().min(1, "Postal code is required") : z.string().optional(),
      BOD: type === "sign-up" ? z.string().min(1, "Birth date is required") : z.string().optional(),
      ssn: type === "sign-up" ? z.string().min(1, "SSN is required") : z.string().optional(),
      email: z.string().email("Invalid email address").min(1, "Email is required"),
      password: z.string().min(8, "Password must be at least 8 characters long"),
  });
};