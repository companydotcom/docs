import { Card, CardHeader, CardBody, Heading, Text, LinkBox, LinkOverlay } from "@vastly/ui"
import NextLink from "next/link"

interface InfoCardProps {
  heading: string
  description: string
  link: string
  isExternal?: boolean
}

export const LinkCard = ({ heading, description, link, isExternal = false }: InfoCardProps) => {
  return (
    <LinkBox as="article">
      <Card>
        <CardHeader>
          <Heading size="md">
            <LinkOverlay as={isExternal ? undefined : NextLink} href={link} isExternal={isExternal}>
              {heading}
            </LinkOverlay>
          </Heading>
        </CardHeader>
        <CardBody pt="0">
          <Text fontSize="sm">{description}</Text>
        </CardBody>
      </Card>
    </LinkBox>
  )
}
