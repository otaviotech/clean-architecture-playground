export class NotFollowingError extends Error {
  data: { followerId: string; followedId: string };

  constructor(followerId: string, followedId: string) {
    super(
      `Profile with id ${followerId} is not following profile with id ${followedId}`
    );

    this.name = 'NotFollowingError';
    this.data = { followerId, followedId };
  }
}
