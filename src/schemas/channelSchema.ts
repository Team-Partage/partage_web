import { z } from 'zod';

export const ChannelSchema = z.object({
  /** true: PRIVATE, false: PUBLIC */
  privateType: z.boolean(),
  channelName: z.string().min(1, '채널 이름을 입력해주세요.'),
  channelTag: z.string(),
  permission: z.array(z.string()),
});
