export default function() {
  return `Bearer ${localStorage.getItem("token")}`;
}
