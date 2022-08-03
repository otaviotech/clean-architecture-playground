export class AlreadyFollowingError extends Error {
  data: {
    followerId: string;
    followedId: string;
  };

  constructor(followerId: string, followedId: string) {
    super(
      `Profile with id ${followerId} is already following profile with id ${followedId}`
    );

    this.name = 'AlreadyFollowingError';
    this.data = { followerId, followedId };
  }
}
