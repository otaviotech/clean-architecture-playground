export class ResourceNotFoundError extends Error {
  data: { resourceName: string; resourceId: string };

  constructor(resourceName: string, resourceId: string) {
    super(`${resourceName} with id ${resourceId} is not found`);

    this.name = 'ResourceNotFoundError';
    this.data = { resourceName, resourceId };
  }
}
