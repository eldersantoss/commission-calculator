interface TableHeaderProps {
  headers: string[];
}

export default function TableHeader({ headers }: TableHeaderProps) {
  function renderTableHeader(headers: string[]) {
    return (
      <tr style={{ borderBottom: "1px solid #888888" }}>
        {headers.map((header, index) => (
          <th key={index} style={{ padding: "15px" }}>
            {header}
          </th>
        ))}
      </tr>
    );
  }

  return <thead>{renderTableHeader(headers)}</thead>;
}
