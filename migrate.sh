#!/bin/bash

# SDMS Frontend Code Reorganization Migration Script
# This script helps migrate components from old structure to new feature-based structure

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Base directories
SRC_DIR="src"
OLD_COMPONENTS_DIR="$SRC_DIR/components"
OLD_SERVICES_DIR="$SRC_DIR/services"
OLD_MODELS_DIR="$SRC_DIR/models"
OLD_UTILITY_DIR="$SRC_DIR/utility"
OLD_REDUX_SLICES_DIR="$SRC_DIR/redux/slices"

# Function to print colored output
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to move files with git (preserves history)
move_with_git() {
    local source=$1
    local destination=$2
    
    if [ ! -f "$source" ]; then
        print_warning "Source file not found: $source"
        return 1
    fi
    
    # Create destination directory if it doesn't exist
    mkdir -p "$(dirname "$destination")"
    
    # Use git mv to preserve history
    git mv "$source" "$destination" 2>/dev/null || mv "$source" "$destination"
    print_success "Moved: $source → $destination"
}

# Function to migrate a feature
migrate_feature() {
    local feature_name=$1
    local component_pattern=$2
    local service_file=$3
    local slice_file=$4
    local model_file=$5
    
    print_info "Migrating feature: $feature_name"
    
    # Move components
    if [ -n "$component_pattern" ]; then
        for component in $OLD_COMPONENTS_DIR/$component_pattern; do
            if [ -f "$component" ]; then
                filename=$(basename "$component")
                move_with_git "$component" "$SRC_DIR/features/$feature_name/components/$filename"
            fi
        done
    fi
    
    # Move service
    if [ -n "$service_file" ] && [ -f "$OLD_SERVICES_DIR/$service_file" ]; then
        move_with_git "$OLD_SERVICES_DIR/$service_file" "$SRC_DIR/features/$feature_name/services/$service_file"
    fi
    
    # Move slice
    if [ -n "$slice_file" ] && [ -f "$OLD_REDUX_SLICES_DIR/$slice_file" ]; then
        move_with_git "$OLD_REDUX_SLICES_DIR/$slice_file" "$SRC_DIR/features/$feature_name/store/$slice_file"
    fi
    
    # Move model
    if [ -n "$model_file" ] && [ -f "$OLD_MODELS_DIR/$model_file" ]; then
        move_with_git "$OLD_MODELS_DIR/$model_file" "$SRC_DIR/features/$feature_name/types/$model_file"
    fi
    
    print_success "Feature migration completed: $feature_name"
}

# Main migration function
main() {
    print_info "Starting SDMS Frontend Code Reorganization"
    print_info "=========================================="
    
    # Check if we're in the right directory
    if [ ! -d "$SRC_DIR" ]; then
        print_error "src/ directory not found. Please run this script from the project root."
        exit 1
    fi
    
    # Create backup
    print_info "Creating backup..."
    timestamp=$(date +%Y%m%d_%H%M%S)
    backup_dir="../sdms-front-backup-$timestamp"
    cp -r . "$backup_dir"
    print_success "Backup created at: $backup_dir"
    
    # Migrate Shared Components First
    print_info "\n=== Migrating Shared Components ==="
    
    # Layout components
    [ -f "$OLD_COMPONENTS_DIR/Header.tsx" ] && move_with_git "$OLD_COMPONENTS_DIR/Header.tsx" "$SRC_DIR/shared/layout/Header.tsx"
    [ -f "$OLD_COMPONENTS_DIR/Footer.tsx" ] && move_with_git "$OLD_COMPONENTS_DIR/Footer.tsx" "$SRC_DIR/shared/layout/Footer.tsx"
    [ -f "$OLD_COMPONENTS_DIR/Navigation.tsx" ] && move_with_git "$OLD_COMPONENTS_DIR/Navigation.tsx" "$SRC_DIR/shared/layout/Navigation.tsx"
    
    # Utilities
    for util_file in authHeader.tsx queryStringFormatter.tsx userSession.tsx; do
        [ -f "$OLD_UTILITY_DIR/$util_file" ] && move_with_git "$OLD_UTILITY_DIR/$util_file" "$SRC_DIR/shared/utils/$util_file"
    done
    
    # Contexts
    for context_file in AuthContext.tsx ToastContext.tsx Toastify.tsx; do
        [ -f "$OLD_UTILITY_DIR/$context_file" ] && move_with_git "$OLD_UTILITY_DIR/$context_file" "$SRC_DIR/shared/contexts/$context_file"
    done
    
    # Generic components
    [ -f "$OLD_COMPONENTS_DIR/PaginationComponent.tsx" ] && move_with_git "$OLD_COMPONENTS_DIR/PaginationComponent.tsx" "$SRC_DIR/shared/components/Pagination.tsx"
    [ -f "$OLD_COMPONENTS_DIR/Confirmation.tsx" ] && move_with_git "$OLD_COMPONENTS_DIR/Confirmation.tsx" "$SRC_DIR/shared/components/modals/Confirmation.tsx"
    
    # Migrate Features
    print_info "\n=== Migrating Features ==="
    
    # Auth Feature
    print_info "\nMigrating Auth Feature..."
    migrate_feature "auth" "Login.tsx Register.tsx ResetPasswordComponent.tsx ManageAccount.tsx ManageUserAccount.tsx UserManagement.tsx AdminUserMngt.tsx ManagementRoles.tsx" \
                    "authService.tsx roleService.tsx" \
                    "authSlice.tsx roleSlice.tsx" \
                    "authModel.tsx userModel.tsx role.tsx"
    
    # Students Feature
    print_info "\nMigrating Students Feature..."
    migrate_feature "students" "Student*.tsx MyWard*.tsx UnregisteredStudent.tsx RegisteredStudents.tsx NewlyAdmittedStudents.tsx ContunuingStudents.tsx" \
                    "studentService.tsx studentRegService.tsx studentCourseRegService.tsx" \
                    "studentSlice.tsx studentRegSlice.tsx studentCourseRegSlice.tsx" \
                    "student.tsx optionalCourseRegistration.tsx"
    
    # Staff Feature
    print_info "\nMigrating Staff Feature..."
    migrate_feature "staff" "Staff*.tsx" \
                    "staffService.tsx StaffDelete.tsx" \
                    "staffSlice.tsx" \
                    "staff.tsx"
    
    # Academics Feature
    print_info "\nMigrating Academics Feature..."
    migrate_feature "academics" "Academic*.tsx Assessment*.tsx ContinuousAssessmentCard.tsx GradeScale.tsx Grading*.tsx ScoreSheetCard.tsx AttendanceCard.tsx" \
                    "assessmentService.tsx assessmentTypeService.tsx attendanceService.tsx scoreSheetService.tsx gradingScaleService.tsx" \
                    "assessmentSlice.tsx assesmentTypeSlice.tsx attendanceSlice.tsx scoreSheetSlice.tsx gradingScaleSlice.tsx" \
                    "assessment.tsx assessmentTypes.tsx attendance.tsx scoreSheet.tsx gradingScale.tsx"
    
    # Admissions Feature
    print_info "\nMigrating Admissions Feature..."
    migrate_feature "admissions" "Admission*.tsx NewAdmissionModal.tsx Registration*.tsx Enrolment.tsx" \
                    "admissionService.tsx" \
                    "admissionSlice.tsx" \
                    "admission.tsx"
    
    # Finance Feature
    print_info "\nMigrating Finance Feature..."
    migrate_feature "finance" "Finance.tsx Bills*.tsx Payment*.tsx Arrears*.tsx FinancialSummaryCard.tsx Student*Bills*.tsx Student*Payment*.tsx" \
                    "billsFeesService.tsx paymentService.tsx taxService.tsx subscriptionService.tsx subscriptionFeeService.tsx" \
                    "billsFeesSlice.tsx paymentSlice.tsx taxSlice.tsx subscriptionSlice.tsx subscriptionFeeSlice.tsx" \
                    "billsFees.tsx payment.tsx tax.tsx subscription.tsx subscriptionFee.tsx"
    
    # Schools Feature
    print_info "\nMigrating Schools Feature..."
    migrate_feature "schools" "School*.tsx Branch*.tsx RegisterSchool.tsx AddBranch.tsx Subscription*.tsx" \
                    "schoolService.tsx" \
                    "schoolSlice.tsx" \
                    "school.tsx branch.tsx"
    
    # Organization Feature
    print_info "\nMigrating Organization Feature..."
    migrate_feature "organization" "Organisation.tsx Department*.tsx Program*.tsx Stage*.tsx ClassGroup*.tsx Subject*.tsx Circuit*.tsx District*.tsx Region*.tsx" \
                    "departmentService.tsx programService.tsx stageService.tsx classGroupService.tsx subjectService.tsx ProgramSubjectService.tsx circuitService.tsx districtService.tsx regionService.tsx" \
                    "departmentSlice.tsx programSlice.tsx stageSlice.tsx classGroupSlice.tsx subjectSlice.tsx programSubjectSlice.tsx circuitSlice.tsx districtSlice.tsx regionSlice.tsx" \
                    "department.tsx program.tsx stage.tsx classGroup.tsx subject.tsx circuit.tsx district.tsx region.tsx"
    
    # Move remaining components to appropriate features
    print_info "\n=== Migrating Remaining Components ==="
    
    # Calendar
    [ -f "$OLD_COMPONENTS_DIR/Calendar.tsx" ] && move_with_git "$OLD_COMPONENTS_DIR/Calendar.tsx" "$SRC_DIR/features/organization/components/Calendar.tsx"
    [ -f "$OLD_SERVICES_DIR/calendarService.tsx" ] && move_with_git "$OLD_SERVICES_DIR/calendarService.tsx" "$SRC_DIR/features/organization/services/calendarService.tsx"
    [ -f "$OLD_REDUX_SLICES_DIR/calendarSlice.tsx" ] && move_with_git "$OLD_REDUX_SLICES_DIR/calendarSlice.tsx" "$SRC_DIR/features/organization/store/calendarSlice.tsx"
    [ -f "$OLD_MODELS_DIR/calendar.tsx" ] && move_with_git "$OLD_MODELS_DIR/calendar.tsx" "$SRC_DIR/features/organization/types/calendar.tsx"
    
    # Lessons/TimeTable
    [ -f "$OLD_COMPONENTS_DIR/TimeTable.tsx" ] && move_with_git "$OLD_COMPONENTS_DIR/TimeTable.tsx" "$SRC_DIR/features/academics/components/TimeTable.tsx"
    [ -f "$OLD_COMPONENTS_DIR/Lesson*.tsx" ] && move_with_git "$OLD_COMPONENTS_DIR/Lesson*.tsx" "$SRC_DIR/features/academics/components/"
    [ -f "$OLD_SERVICES_DIR/lessonService.tsx" ] && move_with_git "$OLD_SERVICES_DIR/lessonService.tsx" "$SRC_DIR/features/academics/services/lessonService.tsx"
    [ -f "$OLD_REDUX_SLICES_DIR/lessonSlice.tsx" ] && move_with_git "$OLD_REDUX_SLICES_DIR/lessonSlice.tsx" "$SRC_DIR/features/academics/store/lessonSlice.tsx"
    [ -f "$OLD_MODELS_DIR/Lesson.tsx" ] && move_with_git "$OLD_MODELS_DIR/Lesson.tsx" "$SRC_DIR/features/academics/types/Lesson.tsx"
    
    # Parent
    [ -f "$OLD_COMPONENTS_DIR/Parent*.tsx" ] && move_with_git "$OLD_COMPONENTS_DIR/Parent*.tsx" "$SRC_DIR/features/students/components/"
    [ -f "$OLD_SERVICES_DIR/parentService.tsx" ] && move_with_git "$OLD_SERVICES_DIR/parentService.tsx" "$SRC_DIR/features/students/services/parentService.tsx"
    [ -f "$OLD_REDUX_SLICES_DIR/parentSlice.tsx" ] && move_with_git "$OLD_REDUX_SLICES_DIR/parentSlice.tsx" "$SRC_DIR/features/students/store/parentSlice.tsx"
    [ -f "$OLD_MODELS_DIR/parent.tsx" ] && move_with_git "$OLD_MODELS_DIR/parent.tsx" "$SRC_DIR/features/students/types/parent.tsx"
    
    # Pages
    print_info "\n=== Moving Page Components ==="
    [ -f "$OLD_COMPONENTS_DIR/Home.tsx" ] && move_with_git "$OLD_COMPONENTS_DIR/Home.tsx" "$SRC_DIR/pages/HomePage.tsx"
    [ -f "$OLD_COMPONENTS_DIR/SystemAdmin.tsx" ] && move_with_git "$OLD_COMPONENTS_DIR/SystemAdmin.tsx" "$SRC_DIR/pages/SystemAdminPage.tsx"
    [ -f "$OLD_COMPONENTS_DIR/Analytics.tsx" ] && move_with_git "$OLD_COMPONENTS_DIR/Analytics.tsx" "$SRC_DIR/pages/AnalyticsPage.tsx"
    [ -f "$OLD_COMPONENTS_DIR/Information.tsx" ] && move_with_git "$OLD_COMPONENTS_DIR/Information.tsx" "$SRC_DIR/pages/InformationPage.tsx"
    [ -f "$OLD_COMPONENTS_DIR/Email.tsx" ] && move_with_git "$OLD_COMPONENTS_DIR/Email.tsx" "$SRC_DIR/pages/EmailPage.tsx"
    
    # Move core store
    print_info "\n=== Organizing Core Files ==="
    [ -f "$SRC_DIR/redux/store.tsx" ] && move_with_git "$SRC_DIR/redux/store.tsx" "$SRC_DIR/core/store/store.ts"
    
    # Move common types
    [ -f "$OLD_MODELS_DIR/pagination.tsx" ] && move_with_git "$OLD_MODELS_DIR/pagination.tsx" "$SRC_DIR/core/types/pagination.ts"
    [ -f "$OLD_MODELS_DIR/params.tsx" ] && move_with_git "$OLD_MODELS_DIR/params.tsx" "$SRC_DIR/core/types/params.ts"
    [ -f "$OLD_MODELS_DIR/queryParams.tsx" ] && move_with_git "$OLD_MODELS_DIR/queryParams.tsx" "$SRC_DIR/core/types/queryParams.ts"
    [ -f "$OLD_MODELS_DIR/utilities.tsx" ] && move_with_git "$OLD_MODELS_DIR/utilities.tsx" "$SRC_DIR/core/types/utilities.ts"
    
    print_success "\n=========================================="
    print_success "Migration completed successfully!"
    print_info "\nNext steps:"
    print_info "1. Run: npm run build (to check for import errors)"
    print_info "2. Update imports in remaining files"
    print_info "3. Test the application thoroughly"
    print_info "4. Remove old empty directories"
    print_info "5. Commit changes: git add . && git commit -m 'refactor: reorganize codebase structure'"
}

# Run main function
main
