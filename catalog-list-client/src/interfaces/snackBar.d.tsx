export interface SnackBarProps {
    successMessage: string| null;
    error: string | null;
    setError: (error: string | null) => void;
    setSuccessMessage: (successMessage: string | null) => void;
}