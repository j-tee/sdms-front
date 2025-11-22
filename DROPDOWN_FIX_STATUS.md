# Dropdown and Date Picker Fix Status

## Summary
Fixing Chrome's transform bug that causes native `<select>` and `<input type="date">` dropdowns to appear at the top-left corner instead of below their inputs.

## Solution Implemented
1. **CustomSelect Component** - Custom dropdown using absolute positioning
2. **FormSelect Wrapper** - Drop-in replacement for `Form.Control as="select"`  
3. **CustomDatePicker Component** - Using react-datepicker library

## Files Updated

### ✅ Fully Updated Components
- [x] `src/components/LocationDropDown.tsx` - Region, District, Circuit (CustomSelect)
- [x] `src/components/BranchDropDown.tsx` - Branch select (FormSelect)
- [x] `src/components/DepartmentDropDown.tsx` - Department select (FormSelect)
- [x] `src/components/StudentEditModal.tsx` - Nationality, Gender selects (FormSelect)
- [x] `src/components/SubjectDropDown.tsx` - Subject select (FormSelect)
- [x] `src/components/StudentBranchDropDown.tsx` - Branch select (FormSelect)
- [x] `src/components/StudentDepartmentDropDown.tsx` - Department select (FormSelect)
- [x] `src/components/SubjectsFromTimetale.tsx` - Subject select (FormSelect)
- [x] `src/components/DistrictCard.tsx` - Region select (FormSelect)
- [x] `src/components/AcademicYearCard.tsx` - Start/End dates (CustomDatePicker)
- [x] `src/components/AcademicTermCard.tsx` - Start/End/Next Term dates (CustomDatePicker)
- [x] `src/components/StaffCard.tsx` - Gender select + DOB date (FormSelect + CustomDatePicker)

### 🔧 Remaining Files to Update

#### Date Inputs (need CustomDatePicker)
- [ ] `src/components/AcademicYearEdit.tsx` - Start/End dates (lines 60, 68)
- [ ] `src/components/AcademicTermEdit.tsx` - Start/End/Next Term dates (lines 101, 113, 125)
- [ ] `src/components/AdmissionEdit.tsx` - Date input (line 182)
- [ ] `src/components/AdmissionAdd.tsx` - Admission date (line 272)
- [ ] `src/components/AttendanceCard.tsx` - Attendance date (line 199)
- [ ] `src/components/ExitProfileDialog.tsx` - Exit date (line 86)
- [ ] `src/components/PaymentDialog.tsx` - Payment date (line 92)
- [ ] `src/components/RegistrationEditModal.tsx` - Date input (line 105)
- [ ] `src/components/StaffEdit.tsx` - DOB (line 139)
- [ ] `src/components/StudentDetails.tsx` - DOB (line 268)
- [ ] `src/components/UnregisteredStudent.tsx` - Registration date (line 209)

#### Select Inputs (need FormSelect)
- [ ] `src/components/ExitProfileDialog.tsx` - Exit category select (line 73)
- [ ] `src/components/ProgramCard.tsx` - Select dropdown (line 97)
- [ ] `src/components/StaffEdit.tsx` - Gender select (line 153)
- [ ] `src/components/StudentDetails.tsx` - Select dropdown (line 250)

## How to Apply Fixes

### For Date Inputs
Replace:
```tsx
<Form.Control 
  type="date" 
  value={formData.date_field}
  onChange={(e) => setFormData({ ...formData, date_field: e.target.value })}
/>
```

With:
```tsx
<CustomDatePicker
  value={formData.date_field}
  onChange={(date) => setFormData({ ...formData, date_field: date })}
/>
```

Add import: `import CustomDatePicker from './CustomDatePicker';`

### For Select Dropdowns
Replace:
```tsx
<Form.Control as="select" onChange={handleChange} value={value}>
  <option>...</option>
</Form.Control>
```

With:
```tsx
<FormSelect onChange={handleChange} value={value}>
  <option>...</option>
</FormSelect>
```

Add import: `import FormSelect from './FormSelect';`

## Testing Checklist
- [ ] Location filters on branch list page
- [ ] Academic Year start/end dates
- [ ] Academic Term dates  
- [ ] Staff member form (gender, DOB)
- [ ] Student edit modal (nationality, gender, DOB)
- [ ] All dropdown menus open below their triggers (not top-left)
- [ ] All date pickers open below their inputs (not top-left)
- [ ] Test in Chrome, Firefox, Safari, Edge
