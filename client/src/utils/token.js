const token = function() {
  return `Bearer ${localStorage.getItem("token")}`;
};

export default token;
