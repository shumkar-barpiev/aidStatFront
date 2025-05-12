import React from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import HomeIcon from "@mui/icons-material/Home";
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from "@mui/material";

interface BreadcrumbItem {
  label: string;
  path: string;
  isLast: boolean;
}

interface BreadcrumbProps {
  path: string;
  rootPath?: string;
  rootLabel?: string;
}

const CustomBreadcrumbs: React.FC<BreadcrumbProps> = ({ path, rootPath = "/", rootLabel = "pages.main" }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const pathSegments = path.split("/").filter((segment) => segment.trim() !== "");

  const breadcrumbItems: BreadcrumbItem[] = pathSegments.map((segment, index) => {
    const segmentPath = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const isLast = index === pathSegments.length - 1;

    const segmentKey = segment.replace(/\s+/g, "_").toLowerCase();

    const label = t(`pages.${segmentKey}`, { defaultValue: segment });

    return {
      label,
      path: segmentPath,
      isLast,
    };
  });

  const handleClick = (path: string) => {
    router.push(path);
  };

  return (
    <MuiBreadcrumbs aria-label="breadcrumb" sx={{ fontSize: "1.1rem" }}>
      <Link
        component="button"
        onClick={() => handleClick(rootPath)}
        underline="hover"
        color="primary.main"
        sx={{
          display: "flex",
          fontWeight: 500,
          alignItems: "center",
          fontSize: "inherit",
          "&:hover": { color: "primary.dark" },
        }}
      >
        <HomeIcon sx={{ mr: 0.5, width: 24, height: 24 }} />
        {t(rootLabel)}
      </Link>

      {breadcrumbItems.map((item, index) =>
        item.isLast ? (
          <Typography
            key={index}
            color="primary.dark"
            sx={{
              fontSize: "inherit",
              fontWeight: 600,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              display: "block",
              maxWidth: { xs: "150px", sm: "320px", md: "100%" },
            }}
          >
            {item.label}
          </Typography>
        ) : (
          <Link
            key={index}
            component="button"
            onClick={() => handleClick(item.path)}
            underline="hover"
            color="primary.main"
            sx={{
              fontSize: "inherit",
              fontWeight: 500,
              "&:hover": { color: "primary.dark" },
            }}
          >
            {item.label}
          </Link>
        )
      )}
    </MuiBreadcrumbs>
  );
};

export default CustomBreadcrumbs;
