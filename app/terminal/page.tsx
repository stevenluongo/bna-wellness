import { fetchTerminal } from "./_actions";
import CloseTerminalForm from "./_forms/closeTerminal";
import CreateTerminalForm from "./_forms/createTerminal";

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
type TerminalWithUser = ThenArg<ReturnType<typeof fetchTerminal>>;

export default async function Terminal() {
  const terminal: TerminalWithUser = await fetchTerminal();

  if (!terminal) {
    return (
      <div>
        <p>Terminal</p>
        <p>There is no active terminal</p>
        <CreateTerminalForm />
      </div>
    );
  }

  return (
    <div>
      <p>Terminal</p>
      <p>Opened by:</p>
      {terminal?.openedBy.firstName}
      <p>opened at:</p>
      {JSON.stringify(terminal.createdAt)}
      <CloseTerminalForm terminalId={terminal.id} />
    </div>
  );
}
