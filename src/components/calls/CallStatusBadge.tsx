export function CallStatusBadge({ status }) {
  const color = status === 'ATENDIDA' ? 'green' : 'red';

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium border whitespace-nowrap bg-${color}-100 text-${color}-800 border-${color}-200 dark:bg-${color}-900 dark:text-${color}-100 dark:border-${color}-800`}
    >
      {status}
    </span>
  );
}
