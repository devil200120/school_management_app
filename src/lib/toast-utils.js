import { toast } from '../hooks/use-toast';

/**
 * Utility functions for consistent toast notifications across the application
 */

export const showToast = {
  success: (message, title = "Success", duration = 3000) => {
    return toast({
      title,
      description: message,
      duration,
    });
  },

  error: (message, title = "Error", duration = 4000) => {
    return toast({
      title,
      description: message,
      variant: "destructive",
      duration,
    });
  },

  info: (message, title = "Info", duration = 3000) => {
    return toast({
      title,
      description: message,
      duration,
    });
  },

  warning: (message, title = "Warning", duration = 4000) => {
    return toast({
      title,
      description: message,
      variant: "destructive",
      duration,
    });
  },

  // Quick success for common operations
  saved: (itemName = "Item") => {
    return toast({
      title: "Success",
      description: `${itemName} saved successfully.`,
      duration: 3000,
    });
  },

  deleted: (itemName = "Item") => {
    return toast({
      title: "Success", 
      description: `${itemName} deleted successfully.`,
      duration: 3000,
    });
  },

  updated: (itemName = "Item") => {
    return toast({
      title: "Success",
      description: `${itemName} updated successfully.`,
      duration: 3000,
    });
  },

  // Quick error for common operations
  saveFailed: (itemName = "Item") => {
    return toast({
      title: "Error",
      description: `Failed to save ${itemName.toLowerCase()}. Please try again.`,
      variant: "destructive",
      duration: 4000,
    });
  },

  deleteFailed: (itemName = "Item") => {
    return toast({
      title: "Error",
      description: `Failed to delete ${itemName.toLowerCase()}. Please try again.`,
      variant: "destructive", 
      duration: 4000,
    });
  },

  validationError: (message = "Please fill in all required fields.") => {
    return toast({
      title: "Validation Error",
      description: message,
      variant: "destructive",
      duration: 3000,
    });
  }
};

export default showToast;