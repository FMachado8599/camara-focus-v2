async function ping() {
  const res = await fetch("/api/health")
  return res.ok
}