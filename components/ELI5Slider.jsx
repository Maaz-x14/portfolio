export default function ELI5Slider({ level, onChange }){
  return (
    <div className="flex items-center gap-3 mt-3">
      <label className="text-sm text-gray-600">Explain like I'm</label>
      <select value={level} onChange={e=>onChange(e.target.value)} className="p-1 border rounded">
        <option value="child">Child</option>
        <option value="student">Student</option>
        <option value="expert">Expert</option>
      </select>
    </div>
  )
}
