function cerror(message = "created error", name = "ERR_CUSTOM") {
  const err = new Error(message);
  err.name = name;
  return err;
}

export { cerror };
