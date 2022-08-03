export interface Command<CommandInput, CommandOutput> {
  execute(input: CommandInput): CommandOutput;
}

export interface AsyncCommand<CommandInput, CommandOutput> {
  execute(input: CommandInput): Promise<CommandOutput>;
}
