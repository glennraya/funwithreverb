import { Button, Card, CardHeader, CardBody } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const Notification = ({ article, closeNotif }) => {
    const [timeoutId, setTimeoutId] = useState(null)
    const duration = 5000

    useEffect(() => {
        // Clear any existing timeout
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        // Start a new timeout
        const newTimeoutId = setTimeout(() => {
            closeNotif(article)
        }, duration)

        setTimeoutId(newTimeoutId)

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
        }
    }, [])

    // Stop the timer on mouse enter
    const handleMouseEnter = () => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
    }

    // Restart the timer after mouse leave
    const handleMouseLeave = () => {
        const newTimeoutId = setTimeout(() => {
            closeNotif(article)
        }, duration)

        setTimeoutId(newTimeoutId)
    }

    return (
        <Card
            shadow="lg"
            className="w-[430px] border border-cyan-200 px-2"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <CardHeader className="justify-between">
                <div className="flex gap-5">
                    <div className="flex flex-col items-start justify-center gap-1">
                        <h4 className="text-default-700 font-semibold leading-none">
                            Delete request was sent
                        </h4>
                    </div>
                </div>
                <Button
                    className="bg-gray-200 text-black"
                    radius="full"
                    size="sm"
                    isIconOnly
                    aria-label="Close"
                    onClick={() => {
                        closeNotif(article)
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="3"
                        stroke="currentColor"
                        className="h-4 w-4 opacity-30 hover:opacity-50"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                        />
                    </svg>
                </Button>
            </CardHeader>
            <CardBody className="text-default-600 pb-4">
                <p>You requested to delete the following article:</p>
                <p className="py-2 font-bold">{article.title}</p>
                <p>
                    The chief editor must approve this before the removal is
                    finalized.
                </p>
            </CardBody>
        </Card>
    )
}

export default Notification
