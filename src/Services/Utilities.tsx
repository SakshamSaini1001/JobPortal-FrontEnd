const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options = { year: "numeric" as const, month: "short" as const };
  return date.toLocaleString("en-US", options);
};
function timeAgo(time: string) {
  const now = new Date();
  const postDate = new Date(time);
  const diff = now.getTime() - postDate.getTime(); // Prevent negative differences

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (seconds < 60) return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
  return `${years} year${years > 1 ? "s" : ""} ago`;
}

const getBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

function formatInterviewTime(isoDate: string): string {
  const date = new Date(isoDate);

  const options: Intl.DateTimeFormatOptions = {
    month: "long", // Full month name (e.g., August)
    day: "numeric", // Numeric day (e.g., 27)
    year: "numeric", // Full year (e.g., 2024)
    hour: "numeric", // Hour (e.g., 10)
    minute: "2-digit", // Minute (e.g., 00)
    hour12: true, // Use 12-hour format
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}

const showResumeFromBase64 = (base64String: string) => {
  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length).fill(null).map((_, i) => byteCharacters.charCodeAt(i));
  const byteArray = new Uint8Array(byteNumbers);

  const blob = new Blob([byteArray], { type: "application/pdf" });

  const blobUrl = URL.createObjectURL(blob);

  window.open(blobUrl, "_blank");

  setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
};

export { formatDate, timeAgo, getBase64,formatInterviewTime,showResumeFromBase64 };
