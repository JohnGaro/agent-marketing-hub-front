import { useQuery, type QueryResult } from '../../../hooks/useAsync';
import { getAgent } from '../service/request';
import type { Agent } from '../service/dto/out';

export function useAgent(uuid: string): QueryResult<Agent> {
  return useQuery(() => getAgent(uuid), [uuid]);
}
