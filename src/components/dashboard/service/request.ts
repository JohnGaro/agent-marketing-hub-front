import api from '../../../lib/api';
import type { Agent } from './dto/out';

export async function getAgent(uuid: string): Promise<Agent> {
  const response = await api.get<Agent>(`/agents/${uuid}`);
  return response.data;
}
