// src/components/common/EmptyState/index.jsx
// TODO: Build reusable EmptyState component
export default function EmptyState({ children, ...props }) {
  return <div {...props}>{children}</div>
}
