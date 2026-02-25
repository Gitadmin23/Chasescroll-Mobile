import { http } from "@/lib/http/client";

export type ExampleItem = {
  id: string;
  name: string;
};

export async function fetchExamples(): Promise<ExampleItem[]> {
  const res = await http.get("/examples");
  return res.data;
}
