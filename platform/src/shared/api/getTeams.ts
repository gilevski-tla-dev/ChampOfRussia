import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "./base"; // Предполагается, что `api` настроен с базовым URL и заголовками

export interface TeamsRequestParams {
  federal_name?: string;
  score?: number; // Сделано необязательным
  page: number;
  size: number;
}

// Ответ от API
export interface User {
	username: string;
	first_name: string;
	middle_name: string;
	last_name: string;
	email: string;
	about: string;
	id: number;
	photo_url: string;
	is_superuser: boolean;
	is_verified: boolean;
}

export interface Team {
  name: string;
  created_at: string;
  about: string;
  id: number;
  area_id: number; // добавили поле area_id
  photo_url: string; // добавили поле photo_url
  event_id: number;
  federal: {
    id: number;
    name: string;
  };
  solutions: Array<{
    team_repository: string;
    solution: string;
    score: number;
    id: number;
    team_id: number;
  }>;
}

// Теперь используем интерфейс Team в TeamResponse
interface TeamResponse {
  items: Array<Team>;
  total: number;
  page: number;
  size: number;
  pages: number;
};

export interface TeamById {
  name: string;
  created_at: string;
  about: string;
  id: number;
  event_id: number;
  federal_representation_id: number;
	photo_url: string | null;
}

export interface ICreateTeam {
	name: string;
	event_id: number;
	area_id: number;
	about?: string;
	photo_url?: string;
}

// Функция для получения списка команд
const fetchTeams = async (
  params: TeamsRequestParams
): Promise<TeamResponse> => {
  const response = await api.get<TeamResponse>("/teams/", {
    params, // Передаем параметры через query string
  });
  return response.data;
};

// Хук для использования данных
export const useTeams = (params: TeamsRequestParams) => {
  return useQuery({
    queryKey: ["teams", params],
    queryFn: () => fetchTeams(params),
    staleTime: 5 * 60 * 1000, // Время устаревания данных
  });
};


// Функция для получения команды
const fetchTeamById = async (id: string): Promise<TeamById> => {
  const response = await api.get<TeamById>(`/teams/${id}`);
  return response.data;
};

// Хук для использования данных команды по ID
export const useTeamById = (id: string) => {
  return useQuery({
    queryKey: ["team", id], // Уникальный ключ запроса, зависит от ID
    queryFn: () => fetchTeamById(id), // Функция для загрузки данных
    staleTime: 1000 * 60 * 5, // Данные считаются свежими в течение 5 минут
    enabled: !!id, // Запрос не будет выполнен, если ID не существует
  });
};

const CreateTeam = async (
  data: FormData
): Promise<ICreateTeam> => {
  console.log(data, ": data");
  const response = await api.post(`/teams/`, data, {
    headers: {
      // Не добавляем Content-Type, так как браузер установит его сам.
      'Content-Type': 'multipart/form-data',
    }
  });
  return response.data;
};

// Хук для создания команды
export const useCreateTeam = () => {
  return useMutation<ICreateTeam, Error, { data: FormData }>({
    mutationFn: ({ data }) => CreateTeam(data),
  });
};

// Функция для добавления пользователя в команду
const addUserToTeam = async (id: number) => {
  const response = await api.post(`/teams/${id}/attach`);
  return response.data; // возвращаем данные, которые получаем от API
};

// Создаем тип, который включает id
interface AddUserToTeamParams {
  id: number; // Параметр id, который передается в запрос
}

// Хук для добавления пользователя в команду
export const useAddUserToTeam = () => {
  return useMutation<unknown, Error, AddUserToTeamParams>({
    mutationFn: ({ id }) => addUserToTeam(id), // Функция использует id
  });
};
