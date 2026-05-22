import { useMemo, useState } from 'react'

const presetTips = [10, 15, 20]

const initialState = {
  bill: '',
  people: '1',
  customTip: '',
  activeTip: 15
}

export default function App() {
  const [form, setForm] = useState(initialState)

  const billValue = parseFloat(form.bill)
  const peopleValue = parseInt(form.people, 10)
  const customTipValue = parseFloat(form.customTip)

  const tipPercent =
    form.customTip !== '' && !Number.isNaN(customTipValue)
      ? customTipValue
      : form.activeTip

  const errors = {
    bill:
      form.bill === ''
        ? ''
        : Number.isNaN(billValue) || billValue <= 0
        ? 'Bill must be greater than 0.'
        : '',
    people:
      form.people === ''
        ? ''
        : !Number.isInteger(peopleValue) || peopleValue < 1
        ? 'People must be at least 1.'
        : '',
    tip:
      tipPercent < 0 || tipPercent > 100
        ? 'Tip must be between 0% and 100%.'
        : ''
  }

  const calculations = useMemo(() => {
    if (errors.bill || errors.people || errors.tip) {
      return {
        tipAmount: 0,
        total: 0,
        perPerson: 0
      }
    }

    const safeBill = Number.isNaN(billValue) ? 0 : billValue
    const safePeople = Number.isNaN(peopleValue) ? 1 : peopleValue

    const tipAmount = safeBill * (tipPercent / 100)
    const total = safeBill + tipAmount
    const perPerson = total / safePeople

    return {
      tipAmount,
      total,
      perPerson
    }
  }, [billValue, peopleValue, tipPercent, errors])

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const selectTip = (value) => {
    setForm((prev) => ({
      ...prev,
      activeTip: value,
      customTip: ''
    }))
  }

  const resetForm = () => {
    setForm(initialState)
  }

  return (
    <div className="page">
      <div className="card">
        <div className="input-panel">
          <h1>Tip Calculator</h1>

          <div className="field">
            <label htmlFor="bill">Bill Amount (Rs)</label>
            <input
              id="bill"
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter bill amount"
              value={form.bill}
              onChange={(e) => updateField('bill', e.target.value)}
            />
            {errors.bill && <p className="error">{errors.bill}</p>}
          </div>

          <div className="field">
            <label>Tip Percentage</label>

            <div className="tip-buttons">
              {presetTips.map((tip) => (
                <button
                  key={tip}
                  type="button"
                  className={
                    tipPercent === tip && form.customTip === ''
                      ? 'tip-button active'
                      : 'tip-button'
                  }
                  onClick={() => selectTip(tip)}
                >
                  {tip}%
                </button>
              ))}

              <input
                type="number"
                min="0"
                max="100"
                placeholder="Custom %"
                value={form.customTip}
                onChange={(e) =>
                  updateField('customTip', e.target.value)
                }
              />
            </div>

            {errors.tip && <p className="error">{errors.tip}</p>}
          </div>

          <div className="field">
            <label htmlFor="people">Number of People</label>
            <input
              id="people"
              type="number"
              min="1"
              step="1"
              placeholder="People count"
              value={form.people}
              onChange={(e) => updateField('people', e.target.value)}
            />
            {errors.people && <p className="error">{errors.people}</p>}
          </div>

          <button className="reset-button" onClick={resetForm}>
            Reset
          </button>
        </div>

        <div className="result-panel">
          <div className="result-box">
            <span>Total Tip</span>
            <strong>Rs {calculations.tipAmount.toFixed(2)}</strong>
          </div>

          <div className="result-box">
            <span>Grand Total</span>
            <strong>Rs {calculations.total.toFixed(2)}</strong>
          </div>

          <div className="result-box">
            <span>Per Person</span>
            <strong>Rs {calculations.perPerson.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  )
}