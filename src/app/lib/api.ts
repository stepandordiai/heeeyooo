import { Project } from "../interfaces/Project";

// TODO:
const url = process.env.API_URL!;
const headers = {
	"X-SILO-KEY": process.env.API_KEY!,
	"Content-Type": "application/json",
};

export const getWorkData = async (): Promise<Project[]> => {
	const response = await fetch(url, { headers });
	const workData = await response.json();
	return workData;
};
