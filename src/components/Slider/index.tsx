import './slider.css';

interface I_Slider {
    label: string
    value: boolean
    setValue: Function
}
export function Slider({ label, value, setValue }: I_Slider) {
    const handleClick = (e: any) => {
        e.stopPropagation();
        setValue(!value)
    }
    return (
        <label className="toggle">
            <input className="toggle-checkbox" type="checkbox" checked={value} title='switch' onChange={(e) => handleClick(e)} />
            <div className="toggle-switch"></div>
            <span className="toggle-label">{label}</span>
        </label>
    );
}